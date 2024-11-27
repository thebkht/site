export const baseUrl = 'https://bkhtdev.com';


export default async function sitemap() {
  const routes = ['', '/guestbook', '/work', '/stack', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes];
}
