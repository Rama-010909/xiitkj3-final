# XII TKJ 3 Portal — v89

Perubahan utama:
- Mode tampilan Light / Dark / Sistem tersedia langsung di halaman awal sebelum memilih layanan login.
- Halaman awal menampilkan mata pelajaran yang sedang berlangsung berdasarkan jadwal Firestore.
- Absen pagi hanya dibuka pukul 06.00–07.30 dan dibatasi satu kali per siswa per hari.
- Absensi mapel otomatis mengikuti jadwal pelajaran; saat istirahat atau di luar jam pelajaran, absensi ditutup.
- Halaman siswa menampilkan mapel dan jam yang sedang berlangsung secara realtime berkala.
- Halaman guru menampilkan data absensi per mapel tanpa perlu membuka sesi secara manual.
- Guru dan admin mendapat notifikasi in-app ketika ada siswa yang baru mengisi absensi; browser notification digunakan bila izin notifikasi diberikan.
- Admin memiliki tombol untuk menghapus akun guru lama dengan username `andi` agar akun guru baru dapat dibuat manual.
- Service worker cache dinaikkan ke v89.

Catatan Firebase:
- Jadwal dibaca dari collection `jadwal` dengan dokumen Senin–Sabtu dan field `entries` berisi `{jam,mapel}`.
- Absensi pagi disimpan di `absensi`.
- Absensi mapel disimpan di `kehadiran_pelajaran`.
- Sistem login yang ada masih memakai collection `accounts` dan sessionStorage, bukan Firebase Authentication. Karena itu jangan mengganti Rules menjadi rules berbasis `request.auth` sebelum sistem login diubah ke Firebase Authentication.
