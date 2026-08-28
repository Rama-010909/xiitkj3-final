# XII TKJ 3 — Vercel Gallery

Versi ini disiapkan untuk **Vercel**. Firebase Storage tidak dipakai untuk galeri.

## Deploy ke Vercel

1. Upload/import folder project ini ke Vercel.
2. Setelah project jadi, buka **Vercel Dashboard → project → Storage**.
3. Buat **Blob Store** baru lalu hubungkan ke project.
4. Pilih store **Public**, karena foto galeri harus bisa dilihat oleh halaman siswa.
5. Pastikan environment variable `BLOB_READ_WRITE_TOKEN` tersedia pada project. Biasanya Vercel menambahkannya saat Blob Store dihubungkan.
6. Deploy ulang project.

## Galeri

- Admin membaca daftar foto dari `/api/gallery`.
- Tombol **Tambah Foto** mengunggah foto langsung dari browser ke Vercel Blob.
- Foto tidak disimpan di filesystem deployment, sehingga tetap tersedia setelah redeploy.
- Tombol **Hapus** menghapus foto upload dari Blob.
- Tombol **↑ / ↓** menyimpan urutan galeri pada `gallery/gallery.json` di Blob.
- Foto bawaan `assets/galeri/momen-1.jpg` sampai `momen-7.jpg` tetap menjadi aset website.
- Batas per foto: 8 MB.

## Firebase

Firestore tetap dipakai untuk absensi, struktur kelas, dan jadwal.
Firebase Storage tidak diperlukan untuk galeri.

## Catatan

Vercel Blob memiliki batas dan ketentuan pemakaian sesuai paket/akun Vercel. Periksa halaman Billing/Storage akun sebelum penggunaan besar.


## Gallery API routing fix
Gallery mutations use query actions on `/api/gallery` because Vercel serverless file `api/gallery.js` does not automatically handle nested paths such as `/api/gallery/complete`.


## Gallery API routing fix
Gallery mutations use query actions on `/api/gallery` because Vercel serverless file `api/gallery.js` does not automatically handle nested paths such as `/api/gallery/complete`.


## v40 fix
Upload galeri memakai nama file unik untuk mencegah error `This blob already exists`. Manifest galeri menggunakan `allowOverwrite: true`.

## v49 - Data Siswa & Statistik Otomatis
- Admin memiliki menu **Data Siswa** untuk edit nama atau hapus siswa. Tidak ada fitur tambah siswa.
- Data siswa disimpan di Firestore collection `siswa`.
- Daftar siswa pertama kali akan diisi otomatis dengan 37 nama yang sebelumnya ada di halaman siswa, lalu tidak akan diisi ulang setelah admin menghapus siswa.
- Halaman siswa mengambil daftar siswa realtime dari `siswa`, sehingga dropdown absensi dan jumlah siswa ikut berubah otomatis.
- Statistik **Siswa**, **Mata Pelajaran**, dan **Hari Belajar** dihitung otomatis dari data Firestore.

### Firestore Rules
Pastikan rules mengizinkan halaman siswa membaca `siswa`, dan admin menambah/mengubah/menghapus data `siswa` serta membaca/menulis `pengaturan/siswaSeed`.
Contoh pengembangan (sesuaikan dengan rules keamanan project kamu):

```
match /siswa/{id} {
  allow read: if true;
  allow write: if true;
}
match /pengaturan/{id} {
  allow read, write: if true;
}
```

## v50 - Firestore Rules lengkap
File `firestore.rules` disertakan untuk collection yang dipakai website:
- `absensi`
- `jadwal`
- `siswa`
- `struktur`
- `pengaturan`

PENTING: upload ke GitHub/Vercel tidak otomatis mem-publish Firestore Rules. Rules tetap harus dipasang di Firebase Console (Firestore > Rules) atau dideploy dengan Firebase CLI.

Rules ini menggunakan `allow read, write: if true` seperti rules testing sebelumnya. Jangan gunakan aturan ini sebagai keamanan final untuk website publik.
