import { AnimatedName } from '@/app/components/nav';
import BookForm from './book-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Create',
  description: 'Create a new book entry.',
};

export default function BookCreate() {
  return (
    <section>
      <h1>Book Create</h1>
      <AnimatedName />
      <BookForm />
    </section>
  );
}
