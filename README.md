# XII TKJ 3 — v56

Perbaikan utama:
- Galeri Admin memakai Vercel Blob untuk tambah, hapus, dan urutkan foto.
- Galeri siswa membaca daftar foto online yang sama.
- Admin menampilkan status Penyimpanan Online.
- Mode Cerah / Gelap / Sistem dengan tema gelap bernuansa navy + hijau + ungu seperti referensi.
- Kontras dark mode diperkuat agar teks, input, tabel, kartu, dan tombol tetap terbaca.
- Logo SMK memakai emblem yang diberikan dan background hitamnya dibuat transparan.
- Mode pilihan disimpan di localStorage.

## Penting untuk Galeri Online
Project harus mempunyai Vercel Blob Store yang terhubung. Vercel menyediakan environment variable `BLOB_READ_WRITE_TOKEN` ketika Blob Store dihubungkan ke project. Setelah menghubungkan Blob Store, lakukan redeploy.

Jika `/api/gallery` masih mengembalikan `503`, buka Vercel > Project > Storage/Blob dan hubungkan atau buat Blob Store untuk project ini, pastikan environment variable tersedia untuk deployment, lalu Redeploy.

## Firebase
Firestore tetap memakai rules yang sudah ada di project.
