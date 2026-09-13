# Build Aplikasi XII TKJ 3

Source ini sudah diarahkan ke website produksi:
`https://xii-tkj3-smknubandar.vercel.app/`

## Android APK

Persyaratan:
- Node.js
- Android Studio + Android SDK

Perintah:
```bash
npm install
npm run android:add
npm run android:sync
npm run android:open
```

Setelah Android Studio terbuka, pilih perangkat/emulator lalu Run.

Untuk membuat debug APK:
```bash
npm run android:build:debug
```

APK biasanya berada di:
`android/app/build/outputs/apk/debug/app-debug.apk`

## Windows EXE

Persyaratan:
- Node.js
- Windows build environment

Perintah:
```bash
npm install
npm run build:windows
```

Installer akan dibuat di folder `dist/`.

## Catatan

Aplikasi hanya menjadi pembungkus (wrapper) untuk website Vercel. Data Firebase/Firestore dan upload Vercel Blob tetap menggunakan backend website produksi. Jangan masukkan `BLOB_READ_WRITE_TOKEN` ke aplikasi.
