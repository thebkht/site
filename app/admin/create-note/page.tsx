'use client';

import { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { createPost } from 'app/db/telegram';
import { useRouter } from 'next/navigation';
import { Navbar } from '../nav';
import { AnimatedName } from 'app/components/nav';

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  return (
    <section>
      <h1 className="font-medium pt-12 mb-0 fade-in">Create a new note</h1>
      <AnimatedName />
      <Navbar />
      <form
        className="max-w-[500px] space-y-2"
        ref={formRef}
        action={async (formData) => {
          const slug = await createPost(formData);
          formRef.current?.reset();
          router.push(`/admin/telegram/`);
        }}
      >
        <textarea
          aria-label="Content"
          placeholder="Content..."
          name="content"
          required
          className="px-4 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <SubmitButton />
      </form>
    </section>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="flex items-center justify-center right-1 top-1 px-2 py-1 font-medium h-8 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-16"
      disabled={pending}
      type="submit"
    >
      Post
    </button>
  );
}
