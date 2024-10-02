import { auth } from 'app/auth';
import { getGuestbookEntries } from 'app/db/queries';
import { redirect } from 'next/navigation';
import Form from './form';
import { AnimatedName } from 'app/components/nav';
import { Navbar } from './nav';

export const metadata = {
  title: 'Admin',
};

export default async function GuestbookPage() {
  let entries = await getGuestbookEntries();

  return (
    <>
      <h1 className="font-medium pt-12 mb-0 fade-in">Admin</h1>
      <AnimatedName />
      <Navbar />
      <Form entries={entries} />
    </>
  );
}
