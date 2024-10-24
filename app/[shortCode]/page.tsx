'use server';
import { getRedirects } from 'app/db/queries';
import { redirect } from 'next/navigation';

interface RedirectPageProps {
  params: {
    shortCode: string;
  };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { shortCode } = params;

  if (shortCode === 'home') {
    return redirect('/');
  }

  const url = await getRedirects(shortCode);
  if (url) return redirect(url.originalurl);

  return null;
}
