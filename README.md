# XII TKJ 3 — v60

## Perubahan
- Dark Mode diperbaiki agar tabel, jadwal, data siswa, galeri, form, dan kartu Admin lebih mudah dibaca.
- Light tetap menggunakan model terang dengan glow hijau + biru/ungu seperti sebelumnya.
- Pilihan mode tetap **Light / Dark / System** tanpa emoji.
- Logo kelas dan logo SMK tetap dipertahankan.
- Galeri tetap menggunakan Vercel Blob untuk foto online, termasuk upload, urutan naik/turun, dan hapus foto online.

## Menghubungkan Galeri ke Vercel Blob

1. Buka Vercel Dashboard.
2. Pilih project website XII TKJ 3.
3. Buka **Storage**.
4. Buat **Blob Store** baru atau pilih Blob Store yang sudah ada.
5. Hubungkan Blob Store ke project.
6. Pastikan environment variable **BLOB_READ_WRITE_TOKEN** tersedia untuk Production (dan Preview jika dipakai).
7. Jalankan **Redeploy** setelah Blob terhubung.
8. Buka `/admin`, login, lalu cek status Galeri. Jika tertulis **Online**, upload foto dari Admin.

Token jangan ditaruh langsung di `index.html` atau `admin.html`. Token harus menjadi Environment Variable di Vercel.

## Catatan Live Server
Di Live Server/localhost, `/api/gallery` tidak akan berjalan seperti di Vercel karena endpoint `api/` adalah Vercel Function. Untuk mengetes upload online, deploy ke Vercel setelah Blob terhubung.
