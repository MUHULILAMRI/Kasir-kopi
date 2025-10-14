
# Kasir Kopi - Aplikasi Point of Sale (POS)



Kasir Kopi adalah aplikasi kasir (Point of Sale) berbasis web yang modern, dirancang khusus untuk coffee shop atau kafe. Dibangun dengan tumpukan teknologi terkini, aplikasi ini menyediakan antarmuka yang cepat, intuitif, dan responsif untuk mengelola penjualan, produk, dan inventaris.

## ✨ Fitur Utama

- **Point of Sale (POS):** Antarmuka kasir yang mudah digunakan untuk membuat dan mengelola pesanan.
- **Manajemen Produk:** Tambah, edit, dan kelola produk kopi, makanan, dan lainnya.
- **Manajemen Inventaris:** Lacak stok produk secara real-time untuk menghindari kehabisan barang.
- **Dasbor Admin:** Halaman admin untuk memantau analitik penjualan, melihat produk terlaris, dan mengelola inventaris.
- **Antarmuka Responsif:** Desain yang dapat beradaptasi dengan baik di berbagai perangkat, termasuk tablet dan desktop.
- **Dialog Tanda Terima & Pembayaran:** Proses checkout yang lancar dengan metode pembayaran dan pembuatan tanda terima digital.
- **Autentikasi:** Sistem login untuk mengamankan akses ke dasbor admin.

## 🚀 Teknologi yang Digunakan

- **Framework:** [Next.js](https://nextjs.org/) – React framework untuk aplikasi web modern.
- **Bahasa:** [TypeScript](https://www.typescriptlang.org/) – Menambahkan tipe statis pada JavaScript untuk skalabilitas.
- **Backend & Database:** [Supabase](https://supabase.io/) – Alternatif open-source untuk Firebase (PostgreSQL, Authentication, Realtime).
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) – Framework CSS utility-first.
- **Komponen UI:** [shadcn/ui](https://ui.shadcn.com/) – Kumpulan komponen UI yang dapat disusun ulang.
- **Manajemen State:** React Hooks & Context API.
- **Package Manager:** [pnpm](https://pnpm.io/) – Manajer paket yang cepat dan efisien.

## 🛠️ Cara Menjalankan Proyek

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

### 1. Prasyarat

- [Node.js](https://nodejs.org/en/) (v18 atau lebih baru)
- [pnpm](https://pnpm.io/installation) terinstal secara global
- Akun [Supabase](https://supabase.com/) untuk membuat database dan mendapatkan kunci API.

### 2. Instalasi

1.  **Clone repository ini:**
    ```bash
    git clone https://github.com/username/kasir-kopi.git
    cd kasir-kopi/donefast-kopi
    ```

2.  **Install dependensi proyek:**
    ```bash
    pnpm install
    ```

### 3. Konfigurasi Lingkungan

1.  **Setup Supabase:**
    - Buat proyek baru di Supabase.
    - Buka **SQL Editor** dan jalankan skrip dari file `scripts/01_create_inventory.sql` untuk membuat tabel yang diperlukan.
    - Buka **Project Settings > API** untuk mendapatkan `URL` dan `anon public key`.

2.  **Buat file `.env.local`:**
    - Di dalam direktori `donefast-kopi`, buat file baru bernama `.env.local`.
    - Salin dan tempelkan variabel berikut, ganti dengan kunci dari Supabase Anda:
      ```env
      NEXT_PUBLIC_SUPABASE_URL=URL_PROYEK_SUPABASE_ANDA
      NEXT_PUBLIC_SUPABASE_ANON_KEY=KUNCI_ANON_PUBLIK_SUPABASE_ANDA
      ```

### 4. Menjalankan Aplikasi

Setelah instalasi dan konfigurasi selesai, jalankan server pengembangan:

```bash
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat aplikasi berjalan.

- Halaman **POS** dapat diakses di `/pos`.
- Halaman **Admin** dapat diakses di `/admin`.

## 📂 Struktur Proyek

```
donefast-kopi/
├── app/                # Routing utama (App Router)
│   ├── admin/          # Halaman dasbor admin
│   ├── pos/            # Halaman Point of Sale
│   ├── api/            # API routes untuk backend
│   └── layout.tsx      # Layout utama
├── components/         # Komponen React
│   ├── admin/          # Komponen khusus halaman admin
│   ├── pos/            # Komponen khusus halaman POS
│   └── ui/             # Komponen UI dari shadcn
├── lib/                # Utilitas dan konfigurasi
│   └── supabase/       # Konfigurasi klien & server Supabase
├── public/             # Aset statis (gambar, ikon)
└── scripts/            # Skrip SQL untuk inisialisasi database
```

## 🤝 Kontribusi

Kontribusi sangat diterima! Jika Anda ingin berkontribusi, silakan fork repository ini dan buat pull request.

1.  Fork repository.
2.  Buat branch baru (`git checkout -b fitur/nama-fitur`).
3.  Lakukan perubahan dan commit (`git commit -m 'Menambahkan fitur X'`).
4.  Push ke branch Anda (`git push origin fitur/nama-fitur`).
5.  Buka Pull Request.

---

Dibuat oleh MUH. ULIL AMRI, S.kom, untuk para pecinta kopi.
