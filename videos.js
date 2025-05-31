// api/videos.js

export default async function handler(req, res) {
  const folder = req.query.folder || '';
  const zoneName = 'maximall'; // Bunny Storage Zone adı
  const apiKey = process.env.BUNNY_API_KEY;

  const url = `https://storage.bunnycdn.com/${zoneName}/${folder}`;

  try {
    const response = await fetch(url, {
      headers: { AccessKey: apiKey }
    });

    if (!response.ok) throw new Error(`API hatası: ${response.statusText}`);

    const files = await response.json();

    const videoUrls = files
      .filter(f => f.ObjectName.endsWith('.mp4'))
      .map(f => `https://maximallcdn.b-cdn.net/${folder}/${f.ObjectName}`);

    res.status(200).json(videoUrls.slice(0, 30)); // max 30 video
  } catch (err) {
    res.status(500).json({ error: 'API hatası', details: err.message });
  }
}
