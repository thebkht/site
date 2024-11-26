import { auth } from '@/lib/auth';
import { getNotes } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import Form from './form';
import { AnimatedName } from '@/components/nav';
import { Navbar } from '../nav';

export const metadata = {
  title: 'Telegram',
};

export default async function GuestbookPage() {
  let notes = await getNotes();
  return (
    <section className="w-full max-w-[calc(var(--vw)*100-var(--pad)*4-82px)] xl:max-w-lg">
      <h1 className="font-medium pt-12 mb-0 fade-in">Telegram</h1>
      <AnimatedName />
      <Navbar />
      <Form notes={notes} />
    </section>
  );
}
