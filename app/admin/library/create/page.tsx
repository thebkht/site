import { AnimatedName } from '@/components/nav';
import BookForm from '../book-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Create',
  description: 'Create a new book entry.',
};

export default function BookCreate() {
  return (
    <section className="w-full max-w-[calc(var(--vw)*100-var(--pad)*4-82px)] xl:max-w-lg">
      <h1>Book Create</h1>
      <AnimatedName />
      <BookForm data={undefined} />
    </section>
  );
}
