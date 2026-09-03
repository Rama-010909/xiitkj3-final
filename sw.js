const CACHE='xii-tkj3-v94';
const ASSETS=[
  '/', '/index.html','/login.html','/siswa.html','/guru.html','/admin.html',
  '/siswa-absensi.html','/siswa-absensi-mapel.html','/siswa-tugas.html','/siswa-jadwal.html',
  '/guru-tugas.html','/guru-pengumpulan.html','/guru-absensi.html','/guru-nilai.html',
  '/admin-jadwal.html','/admin-absensi.html','/manifest.webmanifest',
  '/assets/css/ios-core.css','/assets/js/ios-core.js','/assets/pwa/icon-192.png','/assets/pwa/icon-512.png'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const url=new URL(e.request.url);
  if(url.origin!==location.origin) return;
  e.respondWith(fetch(e.request).then(r=>{
    const copy=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{}); return r;
  }).catch(()=>caches.match(e.request).then(r=>r || caches.match('/login.html'))));
});
