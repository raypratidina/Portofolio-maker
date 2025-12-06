# Portfolio CMS (Next.js + Prisma + Neon + Cloudinary)

Website Portfolio modern dengan panel Admin untuk mengelola Project, Experience, dan Profile.

## ✨ Fitur Utama
- **Admin Panel**: Dashboard lengkap untuk update konten tanpa coding.
- **Upload Gambar**: Integrasi Cloudinary (Cloud Storage).
- **Database**: PostgreSQL via Neon.tech.
- **Optimasi**: Next.js App Router & ISR (Update instan).
- **Responsive**: Layout mobile-friendly dengan Bottom Nav.

## 🚀 Cara Install (Untuk Developer Baru)

1. **Clone Repository**
   ```bash
   git clone https://github.com/raypratidina/Portofolio-maker.git
   cd Portofolio-maker
   ```

2. **Install Library**
   ```bash
   npm install
   ```

3. **Setting Environment (.env)**
   - Buat file `.env` (duplikat dari `.env.example`).
   - Isi kredensial berikut:
   ```env
   DATABASE_URL="postgres://..."
   NEXTAUTH_SECRET="rahasia123"
   NEXTAUTH_URL="http://localhost:3000"
   CLOUDINARY_CLOUD_NAME="..."
   CLOUDINARY_API_KEY="..."
   CLOUDINARY_API_SECRET="..."
   ```

4. **Koneksi Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Jalankan Aplikasi**
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000` di browser.

## 🛠️ Stack Teknologi
- **Framework**: Next.js 15+ (App Router)
- **Database**: PostgreSQL (Neon/Supabase)
- **ORM**: Prisma
- **Auth**: NextAuth.js
- **Styling**: Tailwind CSS
