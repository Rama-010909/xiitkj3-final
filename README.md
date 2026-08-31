# XII TKJ 3 v78

Perbaikan: UI bergaya iOS dengan animasi, font SF-style, kartu glass, hover/press transition; siswa menampilkan nama akun otomatis dan absensi tidak meminta pilih nama.

## Tentang PERMISSION_DENIED
Jika browser menampilkan permission-denied saat membuat akun, berarti Rules yang AKTIF di Firebase Console berbeda/belum ter-deploy. File firestore.rules paket ini berisi allow read, write: if true; deploy/publish rules tersebut di Firebase Console > Firestore Database > Rules. Setelah Publish, Ctrl+F5.

Akun Firestore: collection accounts, document ID=username.
