'use client';

import { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { postTelegramMessage } from 'app/db/telegram';
import { useRouter } from 'next/navigation';
import { getNote } from 'app/db/queries';
import Form from './form';

export default async function Editor({ params }) {
  const note = await getNote(params.slug);

  return <Form note={note} />;
}
