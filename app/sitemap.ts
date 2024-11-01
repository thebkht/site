import { getBlogPosts } from 'app/db/blog';
import { getNotes } from './db/queries';

export const baseUrl = 'https://bkhtdev.com';

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/p/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = ['', '/guestbook', '/blog', '/work', '/stack'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs];
}
