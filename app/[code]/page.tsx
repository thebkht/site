'use server';
import { getRedirects } from '@/lib/db/queries';
import { redirect } from 'next/navigation';

interface RedirectPageProps {
  params: Promise<{ code: string }>;
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { code } = await params;

  if (code === 'home') {
    return redirect('/');
  }

  const url = await getRedirects(code);
  if (url) return redirect(url.originalurl);

  return null;
}
