# XII TKJ 3 v62

Versi ini menambahkan portal Siswa/Guru/Admin, login Firebase Authentication, profil guru, tugas, materi, pengumuman, absensi per pelajaran, dan nilai.

## Setup Firebase
1. Aktifkan Authentication > Sign-in method > Email/Password (username ditampilkan ke pengguna).
2. Buat akun siswa/guru di Authentication.
3. Buat dokumen Firestore `users/{UID}`:
   - siswa: `{ role: "siswa", nama: "Nama Siswa" }`
   - guru: `{ role: "guru", nama: "Nama Guru", mataPelajaran: ["Matematika"] }`
4. Admin dapat memakai halaman admin lama; profil guru bisa dibuat dari menu Data Guru dengan UID akun Authentication.
5. Untuk tahap testing, `firestore.rules` membuka akses semua collection. Sebelum dipakai sungguhan, rules wajib diperketat berdasarkan `request.auth` dan role.

## Galeri
Galeri tetap memakai API Vercel Blob yang sudah ada. Jika kuota Blob sedang habis, operasi upload/hapus/urut dapat tertunda sampai kuota reset atau dipindahkan ke storage lain.

## Vercel
Set `BLOB_READ_WRITE_TOKEN` di Project > Settings > Environment Variables jika memakai galeri Blob. Redeploy setelah mengubah environment variable.


## Login username
Tampilan login memakai username + password. Firebase Authentication tetap menggunakan Email/Password di belakang layar; username dipetakan menjadi alamat internal seperti `rama@xii-tkj3.app`. Buat akun Authentication menggunakan alamat internal tersebut, lalu simpan `username` pada `users/{UID}`. Jangan menyimpan password di Firestore.

## Portal kelas
Dashboard siswa menampilkan pelajaran sekarang, tugas terdekat, pengumuman terbaru, dan ruang mata pelajaran. Guru memiliki ruang mapel untuk tugas, materi, pengumuman, absensi dan nilai.

## Fitur aktif v64
- Siswa dapat mengirim pengumpulan tugas berupa jawaban teks dan/atau URL.
- Pengumpulan disimpan pada `pengumpulan_tugas/{uid}_{tugasId}` sehingga tidak membuat duplikasi setiap kali halaman refresh.
- Guru melihat pengumpulan untuk mapel yang dipilih.
- Dashboard siswa memiliki agenda dari collection `agenda` dan notifikasi dari tugas/pengumuman.
- PWA dasar aktif melalui `manifest.webmanifest` dan `sw.js`.

### Collection tambahan
`pengumpulan_tugas`: tugasId, siswaUid, siswa, mapel, jawaban, link, createdAt, updatedAt.
`agenda`: judul, tanggal/waktu, keterangan/deskripsi, mapel (opsional), createdAt.


## v65 — Navigasi per fitur
Setiap area utama kini ditampilkan sebagai halaman fitur terpisah agar tidak menumpuk dalam satu tampilan panjang. Siswa: Utama, Absensi, Struktur, Jadwal, Galeri, Tugas & Materi, Kalender. Admin: dashboard, mapel, absensi, siswa, guru, struktur, jadwal, galeri. Guru: Tugas, Pengumuman, Materi, Absensi, Nilai, Pengumpulan.


## v66 - Login wajib
- Website diarahkan ke `login.html` saat belum ada sesi login.
- Halaman siswa/guru/admin memasang `auth-guard.js`.
- Sesi demo disimpan di `sessionStorage` setelah login form berhasil.
- Untuk produksi, guard tampilan harus dilengkapi Firebase Authentication + Firestore Rules agar akses data benar-benar terlindungi.
