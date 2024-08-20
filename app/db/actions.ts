'use server';

import { auth } from 'app/auth';
import { type Session } from 'next-auth';
import { sql } from './postgres';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import { Note } from 'app/(blog)/admin/telegram/form';
import { deleteTelegramMessage } from './telegram';

export async function increment(slug: string) {
  noStore();
  await sql`
    INSERT INTO views (slug, count)
    VALUES (${slug}, 1)
    ON CONFLICT (slug)
    DO UPDATE SET count = views.count + 1
  `;
}

async function getSession(): Promise<Session> {
  let session = await auth();
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }

  return session;
}

export async function saveGuestbookEntry(formData: FormData) {
  let session = await getSession();
  let email = session.user?.email as string;
  let created_by = session.user?.name as string;

  if (!session.user) {
    throw new Error('Unauthorized');
  }

  let entry = formData.get('entry')?.toString() || '';
  let body = entry.slice(0, 500);

  await sql`
    INSERT INTO guestbook (email, body, created_by, created_at)
    VALUES (${email}, ${body}, ${created_by}, NOW())
  `;

  revalidatePath('/guestbook');

  let data = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'bkhtdev/blog <guestbook@bkhtdev.com>',
      to: 'b.yusupoff001@gmail.com',
      subject: 'New Guestbook Entry',
      html: `
      <div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f9fafb; color: #333; max-width: 100vw;">
      <div style="max-width: 600px; margin: 0 auto;">
          <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 10px; color: #1f2937;">New Guestbook Entry</h2>
          <p style="font-size: 16px; margin-bottom: 5px;"><span style="font-weight: bold;">Email:</span> ${email}</p>
          <p style="font-size: 16px; margin-bottom: 5px;"><span style="font-weight: bold;">Message:</span></p>
          <p style="font-size: 16px; background-color: #e5e7eb; padding: 10px; border-radius: 8px; border: 1px solid #d1d5db; color: #111827;">${body}</p>
        </div>
      </div>
      `,
    }),
  });

  let response = await data.json();
  console.log('Email sent', response);
}

export async function deleteGuestbookEntries(selectedEntries: string[]) {
  let session = await getSession();
  let email = session.user?.email as string;

  if (email !== 'me@bkhtdev.com' && email !== 'b.yusupoff001@gmail.com') {
    throw new Error('Unauthorized');
  }

  let selectedEntriesAsNumbers = selectedEntries.map(Number);
  let arrayLiteral = `{${selectedEntriesAsNumbers.join(',')}}`;

  await sql`
    DELETE FROM guestbook
    WHERE id = ANY(${arrayLiteral}::int[])
  `;

  revalidatePath('/admin');
  revalidatePath('/guestbook');
}

export async function deleteNotes(selectedNotes: Note[]) {
  let session = await getSession();
  let email = session.user?.email as string;

  if (email !== 'me@bkhtdev.com' && email !== 'b.yusupoff001@gmail.com') {
    throw new Error('Unauthorized');
  }

  let selectedNotesAsNumbers = selectedNotes.map((note) => note.id);
  let arrayLiteral = `{${selectedNotesAsNumbers.join(',')}}`;

  await sql`
    DELETE FROM posts
    WHERE id = ANY(${arrayLiteral}::int[])
  `;

  //delete from telegram
  selectedNotes.forEach(async (note) => {
    try {
      await deleteTelegramMessage(note.telegram_message_id);
    } catch (error) {
      console.error('Error deleting telegram message', error);
    }
  });

  revalidatePath('/admin/telegram');
  revalidatePath('/notes');
}
