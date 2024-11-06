import { promises as fs } from 'fs';
import path from 'path';
import { getBlogPosts } from 'app/db/blog';
import { getNotes } from './db/queries';

export const baseUrl = 'https://bkhtdev.com';

async function getNoteSlugs(dir: string) {
  const entries = await fs.readdir(dir, {
    withFileTypes: true,
  });
  const slugs = await Promise.all(
    entries.map(async (entry) => {
      if (entry.isDirectory()) {
        const subDir = path.join(dir, entry.name);
        const subEntries = await fs.readdir(subDir, {
          withFileTypes: true,
        });
        const pageFile = subEntries.find(
          (subEntry) => subEntry.isFile() && subEntry.name === 'page.mdx'
        );
        if (pageFile) {
          return entry.name;
        }
      }
      return null;
    })
  );
  return slugs.filter(Boolean);
}

export default async function sitemap() {
  const notesDirectory = path.join(process.cwd(), 'app', 'p');
  const slugs = await getNoteSlugs(notesDirectory);

  const notes = slugs.map((slug) => ({
    url: `${baseUrl}/p/${slug}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = ['', '/guestbook', '/work'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...notes];
}
