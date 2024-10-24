'use server';
import { getRedirects } from 'app/db/queries';
import { redirect } from 'next/navigation';

interface RedirectPageProps {
  params: {
    code: string;
  };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { code } = params;

  if (code === 'home') {
    return redirect('/');
  }

  const url = await getRedirects(code);
  if (url) return redirect(url.originalurl);

  return null;
}
