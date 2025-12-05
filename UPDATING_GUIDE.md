# Panduan Update Aplikasi

Berikut adalah cara untuk mengupdate konten dan maintenance aplikasi di kemudian hari.

## 1. Menjalankan Aplikasi di Lokal
Jika Anda ingin mengubah kode atau desain:
1. Buka folder proyek di terminal.
2. Jalankan:
   ```bash
   npm run dev
   ```
3. Buka `http://localhost:3000`.

## 2. Mengupdate Konten (Tanpa Koding)
Anda bisa mengubah isi portofolio tanpa menyentuh kode, cukup login ke **Admin Panel**.

- **Akses**: `/admin/login`
- **Fitur**:
  - **Dashboard**: Melihat ringkasan.
  - **Projects**: Tambah, Edit, Hapus, dan set "Featured" untuk proyek.
  - **Experience**: Tambah riwayat pekerjaan.
  - **Settings**: Ubah profil, bio, dan intro halaman Works.

## 3. Mengupdate Kode & Deploy Ulang

Jika Anda melakukan perubahan pada kode (misalnya mengubah warna, layout, atau menambah fitur):

1. **Lakukan Perubahan** di komputer lokal.
2. **Test** perubahan tersebut dengan `npm run dev` dan `npm run build`.
3. **Commit & Push** ke GitHub:
   ```bash
   git add .
   git commit -m "Deskripsi perubahan yang Anda buat"
   git push
   ```
4. **Otomatis Deploy**:
   - Jika Anda sudah menghubungkan GitHub ke Vercel/Netlify, setiap kali Anda melakukan `git push`, Vercel akan **otomatis** mendeteksi perubahan dan melakukan deploy ulang.
   - Tunggu beberapa menit, dan website live Anda akan terupdate sendiri.

## 4. Backup Data
- **Database**: Lakukan backup rutin pada database PostgreSQL Anda (biasanya penyedia layanan seperti Neon/Supabase sudah punya fitur auto-backup).
- **Foto**: Pastikan file asli foto-foto proyek Anda tersimpan aman di komputer/cloud lain, untuk berjaga-jaga.
