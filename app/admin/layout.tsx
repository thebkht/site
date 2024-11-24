import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

const cx = (...classes) => classes.filter(Boolean).join(' ');

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = await auth();
  if (
    session?.user?.email !== 'me@bkhtdev.com' &&
    session?.user?.email !== 'b.yusupoff001@gmail.com'
  ) {
    redirect('/');
  }
  return <>{children}</>;
}
