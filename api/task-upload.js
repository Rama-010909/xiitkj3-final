const { handleUpload } = require('@vercel/blob/client');

module.exports = async function handler(req, res) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(503).json({ error: 'Vercel Blob belum terhubung ke project. Hubungkan Blob Store lalu deploy ulang.' });
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const body = req.body || {};
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload, multipart) => ({
        allowedContentTypes: ['image/jpeg','image/png','image/webp','image/gif','image/bmp','image/avif','application/pdf'],
        maximumSizeInBytes: 10 * 1024 * 1024,
        addRandomSuffix: true,
        tokenPayload: JSON.stringify({ scope: 'tugas', pathname })
      }),
      onUploadCompleted: async ({ blob }) => {
        console.log('Task upload completed:', blob.pathname);
      }
    });
    return res.status(200).json(jsonResponse);
  } catch (error) {
    console.error('Task Blob token error:', error);
    return res.status(400).json({ error: error?.message || 'Gagal membuat token upload Vercel Blob.' });
  }
};
