# XII TKJ 3 v82

Perbaikan utama:
- Satu form login dinamis untuk Siswa, Guru, dan Admin.
- Judul, ikon, keterangan, dan tombol berubah sesuai role yang dipilih.
- Role akun dicek terhadap field role pada Firestore.
- Akun lama di collection accounts tetap digunakan.
- Password mendukung password biasa dan SHA-256 hash untuk kompatibilitas dengan akun lama.
- Tombol Kembali kembali ke pemilihan role.
- index.html diarahkan ke login.html agar tidak ada form login lama yang menimpa form baru.
