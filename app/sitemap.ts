import { getBlogPosts } from 'app/db/blog';
import { getNotes } from './db/queries';

export const baseUrl = 'https://bkhtdev.com';

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let notes = await getNotes().then((notes) =>
    notes.map((note) => ({
      url: `${baseUrl}/notes/${note.slug}`,
      lastModified: note.publishedAt,
    }))
  );

  let routes = ['', '/guestbook', '/uses', '/notes'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs, ...notes];
}
