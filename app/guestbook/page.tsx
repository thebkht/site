import { auth } from '@/lib/auth';
import { getGuestbookEntries } from '@/lib/db/queries';
import { SignIn, SignOut } from './buttons';
import { Suspense } from 'react';
import Form from './form';
import { AnimatedName } from '@/components/nav';

export const metadata = {
  title: 'Guestbook',
  description: 'Sign my guestbook and leave your mark.',
};

export default function GuestbookPage() {
  return (
    <section className="text-right flex flex-col items-end whitespace-nowrap py-[calc(var(--pad)*2+96px)] px-[calc(var(--pad)*2)] xl:py-[calc(var(--pad)*2+115px)]">
      <div className="w-full max-w-[calc(var(--vw)*100-var(--pad)*4-82px)] xl:max-w-lg">
        <Suspense>
          <GuestbookForm />
          <GuestbookEntries />
        </Suspense>
      </div>
    </section>
  );
}

async function GuestbookForm() {
  let session = await auth();

  return session?.user ? (
    <>
      <Form />
      <SignOut />
    </>
  ) : (
    <SignIn />
  );
}

async function GuestbookEntries() {
  let entries = await getGuestbookEntries();

  if (entries.length === 0) {
    return null;
  }

  return entries.map((entry) => (
    <div key={entry.id} className="flex flex-col space-y-1 mb-4">
      <div className="w-full break-words text-white font-bold text-sm">
        <span className="font-normal mr-1">{entry.created_by}:</span>
        {entry.body}
      </div>
    </div>
  ));
}
