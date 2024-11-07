import { AnimatedName } from '@/components/nav';
import BookList from './books-table';
import { getBooks } from '@/lib/db/books';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Library',
  description: 'A collection of books in my library',
};

export default async function Page() {
  const rows = await getBooks();

  const books = rows.map((row) => ({
    id: row.id,
    title: row.title,
    author: row.author,
    publishedDate: row.published_date,
    type: row.type,
    isbn: row.isbn,
    purchaseDate: row.purchase_date,
    // Add any other properties that are required by the Book type
  }));
  return (
    <section>
      <h1>Library</h1>
      <AnimatedName />
      <BookList data={books} />
    </section>
  );
}
