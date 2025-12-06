# 🔄 Panduan Sinkronisasi (Pindah Laptop)

Panduan ini untuk Anda pemilik website jika ingin melanjutkan coding di laptop berbeda atau mengupdate kode ke GitHub.

---

## 1️⃣ Melanjutkan di Laptop Baru (Pertama Kali)
Jika di laptop B belum ada foldernya sama sekali:

1. **Clone** (Download) project:
   ```bash
   git clone https://github.com/raypratidina/Portofolio-maker.git
   cd Portofolio-maker
   ```

2. **Install** dependensi:
   ```bash
   npm install
   ```

3. **PENTING: File .env**:
   Github **TIDAK** menyimpan file `.env` (password).
   - Buat file baru bernama `.env`.
   - Copy-paste isi `.env` dari laptop lama ke file baru ini.
   - Tanpa ini, website akan error (Database & Upload Gambar mati).

4. **Start**:
   ```bash
   npm run dev
   ```

---

## 2️⃣ Melanjutkan di Laptop Lama (Ambil Update)
Jika di laptop B sudah ada folder tapi kodenya jadul (karena baru update dari laptop A):

1. **Pull** (Tarik Update):
   ```bash
   git pull origin main
   ```
   *Perintah ini akan mendownload semua perubahan terbaru dari GitHub.*

2. **Cek Library Baru** (Optional):
   Terkadang ada library baru ditambahkan. Untuk jaga-jaga, jalankan selalu:
   ```bash
   npm install
   ```
   Lalu jalankan `npm run dev` seperti biasa.

---

## 3️⃣ Upload Perubahan ke GitHub
Setelah selesai mengedit kode dan ingin menyimpannya ke "Cloud" (GitHub):

1. **Cek Status** (Lihat file apa yang berubah):
   ```bash
   git status
   ```

2. **Add & Commit** (Bungkus semua perubahan):
   ```bash
   git add .
   git commit -m "Deskripsi apa yang diubah, misal: Fix typo di halaman contact"
   ```

3. **Push** (Kirim ke GitHub):
   ```bash
   git push origin main
   ```

---

## ⚠️ Masalah Umum (Troubleshooting)

- **Conflict**: Jika `git pull` gagal karena "Merge Conflict", artinya file yang Anda edit bentrok dengan file dari GitHub. Anda harus pilih mana yang dipakai secara manual di VS Code.
- **Permission Denied**: Pastikan GitHub di laptop tersebut sudah login.
