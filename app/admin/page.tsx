import { auth } from '@/lib/auth';
import { getGuestbookEntries } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import Form from './form';
import { AnimatedName } from '@/components/nav';
import { Navbar } from './nav';

export const metadata = {
  title: 'Admin',
};

export default async function GuestbookPage() {
  let entries = await getGuestbookEntries();

  return (
    <section className="w-full max-w-[calc(var(--vw)*100-var(--pad)*4-82px)] xl:max-w-lg">
      <h1 className="font-medium pt-12 mb-0 fade-in">Admin</h1>
      <AnimatedName />
      <Navbar />
      <Form entries={entries} />
    </section>
  );
}
