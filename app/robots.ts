export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: 'https://blog.bkhtdev.com/sitemap.xml',
    host: 'https://blog.bkhtdev.com',
  };
}
