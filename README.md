# XII TKJ 3 v79

- Akun testing lokal `rama` dan `andi` dihapus dari kode login. Jika dokumen `accounts/rama` dan `accounts/andi` sudah ada di Firestore, hapus kedua dokumen tersebut sekali dari Firestore Console.
- Pengumpulan tugas siswa sekarang bisa berupa jawaban, link, dan/atau foto (JPG/PNG/WebP maksimal 5 MB).
- Foto disimpan ke Firebase Storage pada `pengumpulan_tugas/...` dan URL disimpan di Firestore `pengumpulan_tugas`.
- Deploy `storage.rules` ke Firebase Storage sebelum tes upload foto.
- Tampilan diberi motion layer bergaya iOS dan tetap menghormati prefers-reduced-motion.


V80 FIX: login tidak lagi menggunakan accounts={} yang menyebabkan target undefined. Role metadata siswa/guru/admin dikembalikan. Semua akun custom dibaca dari Firestore accounts. Tidak ada akun testing bawaan. Firestore Rules juga mencakup accounts dan users.
