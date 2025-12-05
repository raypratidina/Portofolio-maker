# Panduan Deployment (Vercel/Netlify)

Aplikasi ini saat ini dikonfigurasi untuk **Development** menggunakan:
- Database: SQLite (File lokal)
- Uploads: Penyimpanan File Lokal (`public/uploads`)

## ⚠️ PENTING: Sebelum Deploy ke Production

Hosting serverless seperti **Vercel** atau **Netlify** memiliki sistem file yang "Ephemeral" (sementara). Artinya, **file database SQLite dan foto yang di-upload akan HILANG** setiap kali server melakukan restart atau deploy ulang.

Untuk membuat website ini Live (Production), Anda **HARUS** melakukan perubahan berikut:

### 1. Ganti Database ke PostgreSQL
Anda membutuhkan database cloud. Layanan gratis yang direkomendasikan:
- **Vercel Postgres** (Paling mudah jika deploy di Vercel)
- **Supabase**
- **Neon**

**Langkah-langkah:**
1. Buat database di salah satu layanan di atas. Dapatkan `DATABASE_URL`.
2. Ubah file `prisma/schema.prisma`:
   ```prisma
   // Hapus bagian ini
   // datasource db {
   //   provider = "sqlite"
   //   url      = "file:./dev.db"
   // }

   // Ganti dengan ini
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Update file `.env` di komputer Anda dengan URL baru untuk testing (opsional).
4. Saat deploy di Vercel, masukkan `DATABASE_URL` di menu **Environment Variables**.

### 2. Ganti Sistem Upload Gambar
Karena folder `public/uploads` tidak bisa menyimpan file selamanya di Vercel, Anda harus menggunakan layanan penyimpanan awan (Cloud Storage).

**Opsi:**
- **Vercel Blob** (Mudah)
- **UploadThing** (Populer untuk Next.js)
- **AWS S3 / Cloudinary**

*Catatan: Jika Anda tidak mengubah ini, fitur upload foto akan terlihat 'berhasil' tapi gambar akan hilang setelah beberapa saat.*

---

## Cara Deploy ke Vercel

1. **Push ke GitHub**:
   - Buat repository baru di GitHub.
   - Push kode Anda ke sana.
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <URL_REPO_GITHUB_ANDA>
   git push -u origin main
   ```

2. **Hubungkan ke Vercel**:
   - Buka [vercel.com](https://vercel.com)
   - Klik **Add New Project** -> **Import** repository GitHub tadi.
   - Di bagian **Environment Variables**, tambahkan:
     - `DATABASE_URL`: (URL Database PostgreSQL Anda)
     - `NEXTAUTH_SECRET`: (Isi dengan string acak yang panjang untuk keamanan sesi)
     - `NEXTAUTH_URL`: (Isi dengan domain vercel Anda, misal `https://portfolio-anda.vercel.app`)

3. **Build & Deploy**:
   - Klik **Deploy**.
   - Tunggu proses selesai.
   - Website Anda sekarang Live!

---

## Troubleshooting

- **Error Database**: Pastikan Anda sudah menjalankan `npx prisma db push` atau `npx prisma migrate deploy` ke database PostgreSQL cloud Anda sebelum mengakses website. (Biasanya bisa dilakukan via command build di Vercel atau manual dari lokal jika terkoneksi).
