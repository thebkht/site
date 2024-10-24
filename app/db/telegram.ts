'use server';

import { sql } from './postgres';
import { marked } from 'marked';

// Function to generate a slug from the title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/(^-+|-+$)/g, ''); // Remove leading and trailing hyphens
}

// Function to clean the HTML and keep only Telegram-supported tags
function cleanHTMLforTelegram(html: string): string {
  return html
    .replace(/<\/?p>/g, '\n') // Replace paragraphs with newlines
    .replace(/<h[1-6]>/g, '<b>') // Replace headers with bold tags
    .replace(/<\/h[1-6]>/g, '</b>\n') // Close the bold tag and add a newline
    .replace(/<\/?div>/g, '') // Remove div tags
    .replace(/<br\s*\/?>/g, '\n') // Replace <br> with newlines
    .replace(/<ul>/g, '') // Remove unordered list tags
    .replace(/<\/ul>/g, '')
    .replace(/<ol>/g, '') // Remove ordered list tags
    .replace(/<\/ol>/g, '')
    .replace(/<li>/g, '• ') // Replace list items with bullet points
    .replace(/<\/li>/g, '\n');
}

// Function to post a message to Telegram
export async function postTelegramMessage(formData: FormData) {
  let title = formData.get('title')?.toString() || '';
  let content = formData.get('content')?.toString() || '';
  let image = formData.get('image')?.toString() || null;
  let slug = generateSlug(title);

  // Convert Markdown to HTML and clean it for Telegram
  let markedContent = await marked(content);
  let entry = `<b>${title}</b>\n${cleanHTMLforTelegram(markedContent)}`;

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
        parse_mode: 'HTML', // Use HTML for formatting the message
      }),
    }
  );

  let data = await response.json();
  console.log('Telegram message sent', data);

  // Save the content in Markdown format to the database
  await sql`
     INSERT INTO posts (title, published_at, slug, content, image, telegram_message_id)
     VALUES (${title}, NOW(), ${slug}, ${content}, ${image}, ${data.result.message_id})
  `;

  return slug;
}

// Function to edit a message in Telegram
export async function editTelegramMessage(
  messageId: number,
  formData: FormData
) {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChannelId = process.env.TELEGRAM_CHANNEL_ID;

  const post = await sql`
     SELECT * FROM posts WHERE telegram_message_id = ${messageId}
  `;
  if (!post[0]) {
    throw new Error('Post not found');
  }

  const newTitle = formData.get('title')?.toString() || '';
  const newContent = formData.get('content')?.toString() || '';

  // Convert Markdown to HTML and clean it for Telegram
  let markedContent = await marked(newContent);
  let entry = `<b>${newTitle}</b>\n${cleanHTMLforTelegram(markedContent)}\n@bkhtdev`;

  // Update the content in Markdown format in the database
  await sql`
     UPDATE posts SET content = ${newContent} title = ${newTitle} WHERE telegram_message_id = ${messageId}
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
        text: entry,
        parse_mode: 'HTML', // Use HTML for formatting the message
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
