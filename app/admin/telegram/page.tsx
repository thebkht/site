import { auth } from 'app/auth';
import { getNotes } from 'app/db/queries';
import { redirect } from 'next/navigation';
import Form from './form';

export const metadata = {
  title: 'Telegram',
};

export default async function GuestbookPage() {
  let notes = await getNotes();
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">telegram</h1>
      <Form notes={notes} />
    </section>
  );
}
