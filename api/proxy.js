export const config = { runtime: 'edge' };

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get('path');

  if (!path) return new Response('Falta path', { status: 400 });

  const resp = await fetch(
    'https://estadisticas.bcrp.gob.pe/estadisticas/series/api/' + path,
    { headers: { 'User-Agent': 'Mozilla/5.0' } }
  );

  const body = await resp.text();

  return new Response(body, {
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
      'cache-control': 's-maxage=900',
    },
  });
}
