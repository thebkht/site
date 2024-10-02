import { auth } from 'app/auth';
import { getNotes } from 'app/db/queries';
import { redirect } from 'next/navigation';
import Form from './form';
import { AnimatedName } from 'app/components/nav';
import { Navbar } from '../nav';

export const metadata = {
  title: 'Telegram',
};

export default async function GuestbookPage() {
  let notes = await getNotes();
  return (
    <section>
      <h1 className="font-medium pt-12 mb-0 fade-in">Telegram</h1>
      <AnimatedName />
      <Navbar />
      <Form notes={notes} />
    </section>
  );
}
