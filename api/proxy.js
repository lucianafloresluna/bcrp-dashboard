module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const path = req.query.path;
  if (!path) return res.status(400).json({ error: 'Falta path' });

  const url = 'https://estadisticas.bcrp.gob.pe/estadisticas/series/api/' + path;

  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });

  const data = await response.text();
  res.setHeader('Cache-Control', 's-maxage=900');
  res.status(200).send(data);
};
