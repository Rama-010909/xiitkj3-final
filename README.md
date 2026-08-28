v51 - perbaikan loading tak berujung.

Perubahan: halaman siswa memiliki timeout 8 detik untuk Firestore siswa/jadwal/struktur agar tidak menampilkan loading selamanya. Jika Firestore belum merespons, UI menampilkan fallback yang jelas dan akan tetap memperbarui jika koneksi tersedia.

Firestore Rules di firestore.rules. Copy ke Firebase Console > Firestore Database > Rules lalu Publish.


### Pengaturan jumlah mata pelajaran
Jumlah mata pelajaran di halaman siswa sekarang dapat diatur manual dari Admin > Jumlah Mapel. Nilainya disimpan di `pengaturan/homeStats` pada field `subjectCount`. Jika belum diatur, sistem tetap menghitung dari jadwal.


## v55 changes
- Added Cerah / Gelap / Sistem theme selector, saved in browser localStorage.
- Dark mode adapts backgrounds, text, glass cards, inputs, tables, buttons and other UI colors.
- Replaced school logo with the supplied emblem and removed its black photo background so the surrounding theme can show through.
- Admin gallery now shows bundled local gallery photos as a fallback when /api/gallery is unavailable or has no remote items, so the gallery is not blank during Live Server testing.
