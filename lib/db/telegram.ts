'use server';

import { sql } from './postgres';
import { postTweet } from './twitter';

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const telegramChannelId = process.env.TELEGRAM_CHANNEL_ID;

// Function to create a new post
export async function createPost(formData: FormData) {
  let content = formData.get('content')?.toString() || '';

  try {
    const data = await postTweet(content);
    console.log('Tweet posted', data);
    const tweetId = data.id;

    let response = await fetch(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: telegramChannelId,
          text: content,
        }),
      }
    );

    const telegramData = await response.json();
    console.log('Telegram message sent', telegramData);

    // Save the content in Markdown format to the database and return the ID
    const post = await sql`
        INSERT INTO posts (content, telegramMessageId, tweetId, publishedAt)
        VALUES (${content}, ${telegramData.result.message_id}, ${tweetId}, NOW())
        SELECT id
    `;
    return post[0].id;
  } catch (error) {
    console.error('Error posting tweet:', error);
    throw new Error(`Error posting tweet: ${error.message}`);
  }
}

// Function to edit a message in Telegram
export async function editTelegramMessage(
  messageId: number,
  formData: FormData
) {
  const post = await sql`
     SELECT * FROM posts WHERE telegramMessageId = ${messageId}
  `;
  if (!post[0]) {
    throw new Error('Post not found');
  }

  const newContent = formData.get('content')?.toString() || '';

  // Update the content in Markdown format in the database
  await sql`
     UPDATE posts SET content = ${newContent} WHERE telegramMessageId = ${messageId}
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
      }),
    }
  );

  let data = await response.json();
  console.log('Telegram message edited', data);
}

export async function deletePost(id: string) {
  const post = await sql`
     SELECT * FROM posts WHERE id = ${id}
  `;
  if (!post[0]) {
    throw new Error('Post not found');
  }

  const messageId = post[0].telegramMessageId;
  const tweetId = post[0].tweetId;

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

  try {
    const deleteResponse = await deletePost(tweetId);
    console.log('Tweet deleted', deleteResponse);
  } catch (error) {
    console.error('Error deleting tweet:', error);
    throw new Error(`Error deleting tweet: ${error.message}`);
  }
}
