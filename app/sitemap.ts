import { getBlogPosts } from 'app/db/blog';
import { promises as fs } from 'fs';
import path from 'path';

export const baseUrl = 'https://bkhtdev.com';

async function getNoteSlugs(dir: string) {
  const entries = await fs.readdir(dir, {
    recursive: true,
    withFileTypes: true,
  });
  return entries
    .filter((entry) => entry.isFile() && entry.name === 'page.mdx')
    .map((entry) => {
      const relativePath = path.relative(
        dir,
        path.join(entry.parentPath, entry.name)
      );
      return path.dirname(relativePath);
    })
    .map((slug) => slug.replace(/\\/g, '/'));
}

export default async function sitemap() {
  const notesDirectory = path.join(process.cwd(), 'app', 'p');
  const slugs = await getNoteSlugs(notesDirectory);

  const notes = slugs.map((slug) => ({
    url: `${baseUrl}/p/${slug}`,
    lastModified: new Date().toISOString(),
  }));

  let routes = ['', '/guestbook', '/blog', '/work', '/stack'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...notes];
}
