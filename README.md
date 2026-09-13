# XII TKJ 3 v83
- Login Siswa/Guru/Admin memakai satu form dinamis.
- Login Admin master: tkj3 / smknubandar.
- Firebase config dikembalikan ke config project yang benar dari paket v81.
- Akun siswa/guru tetap dibaca dari Firestore collection accounts.
- Tampilan diberi polish iOS/glassmorphism + animasi.
- Firestore rules mencakup accounts dan users.


v84: Login UI redesigned with clean iOS-style SVG icons, no emoji, stronger micro-interactions, and global motion polish. Visible emoji characters were removed from main pages.


Versi v94: PWA installable untuk HP/desktop, perbaikan klik logo, dan upload tugas/pengumpulan melalui Vercel Blob.


Versi v96: layanan halaman awal diperbarui menjadi Login Akun, Absensi Harian, dan Pengumuman. Nama Absen Pagi diubah menjadi Absensi Harian tanpa mengubah jadwal buka 06.00–07.30 WIB.


## Penting: Firestore rules untuk Tugas
Fitur Tugas menggunakan collection `tugas` dan `pengumpulan_tugas`. Pastikan rules Firestore di project Firebase `absensi-xii-tkj3` sudah mencakup kedua collection tersebut. Deploy website ke Vercel tidak otomatis menerapkan `firestore.rules` ke Firebase. Jika muncul `Missing or insufficient permissions`, buka Firebase Console → Firestore Database → Rules, tambahkan:

```text
match /tugas/{document=**} { allow read, write: if true; }
match /pengumpulan_tugas/{document=**} { allow read, write: if true; }
```

Lalu klik Publish. Setelah itu tes kembali guru menerbitkan tugas.
