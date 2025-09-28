-- TABEL PRODUK
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric not null,
  stock int not null default 0,
  category text,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- TABEL PERGERAKAN STOK
create table if not exists public.stock_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  delta int not null,
  reason text not null default 'adjustment',
  created_at timestamptz not null default now()
);

-- RLS
alter table public.products enable row level security;
alter table public.stock_movements enable row level security;

-- Policy baca untuk semua pengguna terautentikasi
create policy if not exists "products select for authenticated"
  on public.products
  for select
  to authenticated
  using (true);

create policy if not exists "movements select for authenticated"
  on public.stock_movements
  for select
  to authenticated
  using (true);

-- Policy tulis untuk admin (JWT claim role = 'admin')
-- Pastikan Anda mengonfigurasi JWT claim 'role' pada Supabase bila perlu.
create policy if not exists "products write for admin"
  on public.products
  for all
  to authenticated
  using (auth.jwt() ->> 'role' = 'admin')
  with check (auth.jwt() ->> 'role' = 'admin');

create policy if not exists "movements write for admin"
  on public.stock_movements
  for all
  to authenticated
  using (auth.jwt() ->> 'role' = 'admin')
  with check (auth.jwt() ->> 'role' = 'admin');
