# v73 — Fullscreen Login
- Pemilihan Siswa/Guru/Admin dan form login dibuat sebagai dua layar penuh.
- Setelah role dipilih, pilihan role benar-benar hilang dari layar.
- Berlaku desktop dan HP.
- Transisi antar layar fade/slide.
- Background glow halus.
- Tombol mata password tetap SVG.
- Akun testing: siswa rama/010909, guru andi/smknubandar, admin tkj3/smknubandar.
- Halaman terlindungi memakai session role guard.


## v77 — nama akun otomatis
- Setelah login, nama yang tersimpan pada akun otomatis tampil di halaman siswa.
- Kolom Nama Siswa pada absensi sudah bukan dropdown; nama dikunci mengikuti akun login.
- Saat mengirim absensi, nama diambil langsung dari session akun, jadi siswa tidak bisa mengganti nama siswa lain.
- Default siswa `rama` sekarang tampil sebagai `Rama`, bukan `Siswa`.
