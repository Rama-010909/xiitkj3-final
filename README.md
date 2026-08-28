v51 - perbaikan loading tak berujung.

Perubahan: halaman siswa memiliki timeout 8 detik untuk Firestore siswa/jadwal/struktur agar tidak menampilkan loading selamanya. Jika Firestore belum merespons, UI menampilkan fallback yang jelas dan akan tetap memperbarui jika koneksi tersedia.

Firestore Rules di firestore.rules. Copy ke Firebase Console > Firestore Database > Rules lalu Publish.


### Pengaturan jumlah mata pelajaran
Jumlah mata pelajaran di halaman siswa sekarang dapat diatur manual dari Admin > Jumlah Mapel. Nilainya disimpan di `pengaturan/homeStats` pada field `subjectCount`. Jika belum diatur, sistem tetap menghitung dari jadwal.
