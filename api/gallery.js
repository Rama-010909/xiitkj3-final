const { put, del, list } = require('@vercel/blob');
const { handleUpload } = require('@vercel/blob/client');

const DEFAULTS = [1,2,3,4,5,6,7].map(n => ({
  id: `local-${n}`,
  src: `/assets/galeri/momen-${n}.jpg`,
  name: `Momen ${n}`,
  urutan: n,
  local: true
}));

const MANIFEST_PATH = 'gallery/gallery.json';

function json(res, status, body) {
  res.status(status).json(body);
}

async function getManifestUrl() {
  const result = await list({ prefix: 'gallery/gallery.json', limit: 10 });
  const exact = (result.blobs || []).find(b => b.pathname === MANIFEST_PATH);
  return exact?.url || null;
}

async function readGallery() {
  const url = await getManifestUrl();
  if (!url) {
    await writeGallery(DEFAULTS);
    return DEFAULTS.map(x => ({ ...x }));
  }

  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error('Manifest galeri tidak bisa dibaca.');
  const data = await response.json();
  return Array.isArray(data) ? data : DEFAULTS.map(x => ({ ...x }));
}

async function writeGallery(rows) {
  const normalized = rows.map((x, i) => ({ ...x, urutan: i + 1 }));
  await put(MANIFEST_PATH, JSON.stringify(normalized, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json',
    cacheControlMaxAge: 0,
    allowOverwrite: true
  });
}

function safeName(name) {
  return String(name || 'foto').replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100);
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (req.method === 'GET') {
      return json(res, 200, { ok: true, items: await readGallery() });
    }

    const urlObj = new URL(req.url || '/api/gallery', `https://${req.headers.host || 'localhost'}`);
    const action = urlObj.searchParams.get('action') || '';

    if (req.method === 'POST' && action === 'upload') {
      // Client-side Vercel Blob upload uses this endpoint only to obtain a short-lived upload token.
      // The actual image bytes go directly from the browser to Blob, so large photos do not pass through the Function.
      const body = req.body || {};
      const jsonResponse = await handleUpload({
        body,
        request: req,
        onBeforeGenerateToken: async () => ({
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/avif'],
          maximumSizeInBytes: 8 * 1024 * 1024,
          addRandomSuffix: true
        }),
        onUploadCompleted: async ({ blob }) => {
          console.log('Gallery upload completed:', blob.pathname);
        }
      });
      return res.status(200).json(jsonResponse);
    }

    if (req.method === 'POST' && action === 'complete') {
      const body = req.body || {};
      const blobs = Array.isArray(body.blobs) ? body.blobs : [];
      if (!blobs.length) return json(res, 400, { ok: false, error: 'Upload foto belum diterima.' });
      const gallery = await readGallery();
      const added = blobs.map((blob, index) => ({
        id: `blob-${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${index}`,
        src: blob.url,
        name: blob.pathname?.split('/').pop() || 'Foto',
        local: false,
        createdAt: Date.now(),
        urutan: gallery.length + index + 1,
        blobUrl: blob.url
      }));
      const next = gallery.concat(added);
      await writeGallery(next);
      return json(res, 200, { ok: true, items: added, gallery: next });
    }

    const path = (req.url || '').split('?')[0];

    if (req.method === 'DELETE' && action === 'delete') {
      const id = urlObj.searchParams.get('id');
      if (!id) return json(res, 400, { ok: false, error: 'ID foto tidak valid.' });
      const gallery = await readGallery();
      const item = gallery.find(x => x.id === id);
      if (!item) return json(res, 404, { ok: false, error: 'Foto tidak ditemukan.' });

      if (!item.local && item.blobUrl) {
        try { await del(item.blobUrl); } catch (e) { console.warn('Blob delete:', e.message); }
      }

      const next = gallery.filter(x => x.id !== id);
      await writeGallery(next);
      return json(res, 200, { ok: true, gallery: next });
    }

    if (req.method === 'POST' && action === 'reorder') {
      const body = typeof req.body === 'object' && req.body ? req.body : {};
      const ids = Array.isArray(body.ids) ? body.ids : [];
      if (!ids.length) return json(res, 400, { ok: false, error: 'Data urutan tidak valid.' });
      const current = await readGallery();
      const map = new Map(current.map(x => [x.id, x]));
      const ordered = ids.map(id => map.get(id)).filter(Boolean);
      current.forEach(x => { if (!ids.includes(x.id)) ordered.push(x); });
      await writeGallery(ordered);
      return json(res, 200, { ok: true, gallery: ordered });
    }

    return json(res, 404, { ok: false, error: 'Endpoint tidak ditemukan.' });
  } catch (error) {
    console.error('Gallery API error:', error);
    return json(res, 500, { ok: false, error: error?.message || 'Server galeri gagal.' });
  }
};
