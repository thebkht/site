'use server';

import { sql } from './postgres';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/(^-+|-+$)/g, ''); // Remove leading and trailing hyphens
}

export async function postTelegramMessage(formData: FormData) {
  let title = formData.get('title')?.toString() || '';
  let content = formData.get('content')?.toString() || '';
  let image = formData.get('image')?.toString() || null;
  let slug = generateSlug(title);

  let entry = `*${title}*\n\n${content}`;

  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChannelId = process.env.TELEGRAM_CHANNEL_ID;

  let response = await fetch(
    `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: telegramChannelId,
        text: entry,
        parse_mode: 'MarkdownV2', // Optional: For formatting the message with HTML
      }),
    }
  );

  let data = await response.json();
  console.log('Telegram message sent', data);

  await sql`
     INSERT INTO posts (title, published_at, slug, content, image, telegram_message_id)
     VALUES (${title}, NOW(), ${slug}, ${content}, ${image}, ${data.result.message_id})
  `;

  return slug;
}

export async function postLongMessage(message: string) {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChannelId = process.env.TELEGRAM_CHANNEL_ID;

  const maxLength = 4096;

  // Split the message into chunks of maxLength
  const messageParts = message.match(new RegExp(`.{1,${maxLength}}`, 'g'));

  if (messageParts) {
    for (const part of messageParts) {
      await fetch(
        `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: telegramChannelId,
            text: part,
            parse_mode: 'MarkdownV2', // Adjust as needed for your formatting
          }),
        }
      );
    }
    console.log('Long message sent in parts');
  } else {
    console.error('Message splitting failed');
  }
}

export async function editTelegramMessage(
  messageId: number,
  newContent: string
) {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChannelId = process.env.TELEGRAM_CHANNEL_ID;

  const post = await sql`
     SELECT * FROM posts WHERE telegram_message_id = ${messageId}
       `;
  if (!post[0]) {
    throw new Error('Post not found');
  }

  await sql`
     UPDATE posts SET content = ${newContent} WHERE telegram_message_id = ${messageId}
     `;

  let response = await fetch(
    `https://api.telegram.org/bot${telegramBotToken}/editMessageText`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: telegramChannelId,
        message_id: messageId,
        text: newContent,
        parse_mode: 'MarkdownV2', // Optional: For formatting the message with HTML
      }),
    }
  );

  let data = await response.json();
  console.log('Telegram message edited', data);
}

export async function deleteTelegramMessage(messageId: number) {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChannelId = process.env.TELEGRAM_CHANNEL_ID;

  let response = await fetch(
    `https://api.telegram.org/bot${telegramBotToken}/deleteMessage`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: telegramChannelId,
        message_id: messageId,
      }),
    }
  );

  let data = await response.json();
  console.log('Telegram message deleted', data);
}
