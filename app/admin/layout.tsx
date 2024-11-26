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
  return (
    <div className="text-right flex flex-col items-end whitespace-nowrap py-[calc(var(--pad)*2+96px)] px-[calc(var(--pad)*2)] xl:py-[calc(var(--pad)*2+115px)]">
      {children}
    </div>
  );
}
