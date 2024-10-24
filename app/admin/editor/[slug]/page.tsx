'use client';

import { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { postTelegramMessage } from 'app/db/telegram';
import { useRouter } from 'next/navigation';
import { getNote } from 'app/db/queries';
import Form from './form';
import { Navbar } from 'app/admin/nav';
import { AnimatedName } from 'app/components/nav';

export default async function Editor({ params }) {
  const note = await getNote(params.slug);

  return (
    <section>
      <h1 className="font-medium pt-12 mb-0 fade-in">
        {note ? 'Edit' : 'Create'} a note
      </h1>
      <AnimatedName />
      <Navbar />
      <Form note={note} />
    </section>
  );
}
