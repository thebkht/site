import { AnimatedName } from '@/components/nav';
import { notFound } from 'next/navigation';
import BookForm from '../../book-form';
import { getBook } from '@/lib/db/books';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Book',
  description: 'Edit a book entry.',
};

export default async function Page({ params }) {
  const { id } = await params;
  let book = await getBook(id);
  if (!book) {
    notFound();
  }
  return (
    <section className="w-full max-w-[calc(var(--vw)*100-var(--pad)*4-82px)] xl:max-w-lg">
      <h1>Edit Book</h1>
      <AnimatedName />
      <BookForm data={book} />
    </section>
  );
}
