'use server';

import { auth, youtube } from '@googleapis/youtube';
import { sql } from './postgres';
import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from 'next/cache';
import { GuestbookEntry } from '../types';

let googleAuth = new auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  },
  scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
});

let yt = youtube({
  version: 'v3',
  auth: googleAuth,
});

export async function getBlogViews() {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  noStore();
  let views = await sql`
    SELECT count
    FROM views
  `;

  return views.reduce((acc, curr) => acc + Number(curr.count), 0);
}

export async function getViewsCount(): Promise<
  { slug: string; count: number }[]
> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  noStore();
  return sql`
    SELECT slug, count
    FROM views
  `;
}

export const getLeeYouTubeSubs = cache(
  async () => {
    let response = await yt.channels.list({
      id: ['UCZMli3czZnd1uoc1ShTouQw'],
      part: ['statistics'],
    });

    let channel = response.data.items![0];
    return Number(channel?.statistics?.subscriberCount).toLocaleString();
  },
  ['leerob-youtube-subs'],
  {
    revalidate: 3600,
  }
);

export const getVercelYouTubeSubs = cache(
  async () => {
    let response = await yt.channels.list({
      id: ['UCLq8gNoee7oXM7MvTdjyQvA'],
      part: ['statistics'],
    });

    let channel = response.data.items![0];
    return Number(channel?.statistics?.subscriberCount).toLocaleString();
  },
  ['vercel-youtube-subs'],
  {
    revalidate: 3600,
  }
);

export async function getGuestbookEntries() {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  noStore();
  return sql<GuestbookEntry[]>`
    SELECT id, body, created_by, updated_at
    FROM guestbook
    ORDER BY created_at DESC
    LIMIT 100
  `;
}

export async function getNotes() {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  noStore();
  // return published_date as string
  return sql`
    SELECT id, content, publishedAt, telegramMessageId, tweetId
    FROM posts
    ORDER BY publishedAt DESC
    LIMIT 100
  `;
}

export async function getNote(slug: string) {
  if (!process.env.POSTGRES_URL) {
    return;
  }

  let notes = await sql`
    SELECT *
    FROM posts
    WHERE id = ${slug}
  `;

  return notes[0];
}

export async function getRedirects(short: string) {
  if (!process.env.POSTGRES_URL) {
    return;
  }

  noStore();
  const url = await sql`
    SELECT original_url as originalUrl from url where short_code = ${short} and user_email = 'b.yusupoff001@gmail.com' limit 1`;

  return url[0];
}

export async function getPattern() {
  if (!process.env.POSTGRES_URL) {
    return;
  }

  noStore();
  const pattern = await sql`
    SELECT pattern_text as pattern from pattern limit 1`;

  return pattern[0];
}
