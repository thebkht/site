'use server';

export async function postTelegramMessage(formData: FormData) {
  let entry = formData.get('entry')?.toString() || '';

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
