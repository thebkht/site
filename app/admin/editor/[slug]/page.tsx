'use client';

import { getNote } from '@/lib/db/queries';
import Form from './form';
import { Navbar } from 'app/admin/nav';
import { AnimatedName } from '@/components/nav';

export default async function Editor({ params }) {
  const note = await getNote(params.slug);

  return (
    <section className="w-full max-w-[calc(var(--vw)*100-var(--pad)*4-82px)] xl:max-w-lg">
      <h1 className="font-medium pt-12 mb-0 fade-in">
        {note ? 'Edit' : 'Create'} a note
      </h1>
      <AnimatedName />
      <Navbar />
      <Form note={note} />
    </section>
  );
}
