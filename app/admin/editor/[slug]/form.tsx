'use client';

import { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { editTelegramMessage, postTelegramMessage } from 'app/db/telegram';
import { useRouter } from 'next/navigation';
import { Note } from 'app/admin/telegram/form';

export default function Form({ note }) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  return (
    <form
      className="max-w-[500px] space-y-2"
      ref={formRef}
      action={async (formData) => {
        await editTelegramMessage(note.telegram_message_id, formData);
        formRef.current?.reset();
        router.push(`/notes/${note.slug}`);
      }}
    >
      <input
        aria-label="Title"
        placeholder="Title..."
        name="title"
        type="text"
        value={note.title}
        required
        className="px-4 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-neutral-300 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
      />
      <textarea
        aria-label="Content"
        placeholder="Content..."
        name="content"
        value={note.content}
        required
        className="px-4 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-neutral-300 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
      />
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="flex items-center justify-center right-1 top-1 px-2 py-1 font-medium h-8 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded w-16"
      disabled={pending}
      type="submit"
    >
      Post
    </button>
  );
}
