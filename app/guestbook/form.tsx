'use client';

import { useRef } from 'react';
import { saveGuestbookEntry } from '../../lib/db/actions';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      className="relative max-w-[500px]"
      ref={formRef}
      action={async (formData) => {
        await saveGuestbookEntry(formData);
        formRef.current?.reset();
      }}
    >
      <Input
        aria-label="Your message"
        placeholder="Your message..."
        name="entry"
        type="text"
        required
        className="pl-4 pr-32 py-2 mt-1"
      />
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="absolute right-0 top-0" type="submit">
      Sign
    </Button>
  );
}
