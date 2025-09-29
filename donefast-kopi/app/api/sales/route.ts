import { NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const supabase = getServerSupabase();
  const { cartItems, paymentMethod, customerName } = await req.json();

  if (!cartItems || cartItems.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  try {
    let totalAmount = 0;
    const salesItems = [];

    console.log('Received cartItems:', JSON.stringify(cartItems, null, 2));
    console.log('Received paymentMethod:', paymentMethod);
    console.log('Received customerName:', customerName);

    // Calculate total amount and prepare sales items
    for (const item of cartItems) {
      const price = Number(item.product.price);
      const quantity = Number(item.qty);

      if (isNaN(price) || isNaN(quantity)) {
        console.error('Invalid price or quantity in cart item:', item);
        throw new Error('Invalid product price or quantity in cart.');
      }
      totalAmount += price * quantity;
      salesItems.push({
        product_id: item.product.id,
        quantity: quantity,
        price_at_sale: price,
      });
    }

    console.log('Calculated totalAmount:', totalAmount);

    if (isNaN(totalAmount)) {
      console.error('totalAmount is NaN after calculation.', { cartItems, totalAmount });
      throw new Error('Calculated total amount is not a valid number.');
    }

    // Prepare insert object for sales table
    const salesInsertData: { total_amount: number; payment_method: string; customer_name?: string } = {
      total_amount: totalAmount,
      payment_method: paymentMethod,
    };
    if (customerName && customerName.trim() !== '') {
      salesInsertData.customer_name = customerName;
    }

    // 1. Record the sale
    console.log('Attempting to insert sale with data:', salesInsertData);
    const { data: sale, error: saleError } = await supabase
      .from('sales')
      .insert(salesInsertData)
      .select();

    if (saleError) {
      console.error('Error inserting sale:', saleError);
      throw new Error(saleError.message);
    }
    console.log('Sale inserted successfully:', sale);

    const saleId = sale[0].id;
    const saleDate = sale[0].created_at;

    // 2. Record individual sales items
    const salesItemsWithSaleId = salesItems.map(item => ({ ...item, sale_id: saleId }));
    const { error: salesItemsError } = await supabase
      .from('sales_items')
      .insert(salesItemsWithSaleId);

    if (salesItemsError) {
      console.error('Error inserting sales items:', salesItemsError);
      throw new Error(salesItemsError.message);
    }

    // 3. Reduce product stock
    for (const item of cartItems) {
      const { error: stockError } = await supabase
        .from('products')
        .update({ stock: (item.product.stock || 0) - Number(item.qty) })
        .eq('id', item.product.id);

      if (stockError) {
        console.error(`Error updating stock for product ${item.product.id}:`, stockError);
        throw new Error(stockError.message);
      }
    }

    return NextResponse.json(
      {
        message: 'Transaction processed successfully',
        transactionId: saleId,
        date: new Date(saleDate).toLocaleString(),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Unhandled error in sales API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
