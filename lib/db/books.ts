'use server';
import { put } from '@vercel/blob';
import { sql } from './postgres';
import { BookFormValues } from '../../app/admin/library/book-form';

//function to generate a slug from a title
export async function slugify(title: string) {
  const slug = title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '');

  if (await isSlugUnique(slug)) {
    return slug;
  } else {
    return `${slug}-${Math.random().toString(36).substring(2, 7)}`;
  }
}

//function to check slug uniqueness
export async function isSlugUnique(slug: string) {
  const books = await sql`
     SELECT * FROM books WHERE slug = ${slug}
       `;
  return books.length === 0;
}

export async function getBooks() {
  const books = await sql`
     SELECT * FROM books
       `;
  return books;
}

export async function getBook(id: string) {
  const [book] = await sql`
     SELECT * FROM books WHERE id = ${id}
       `;
  return book;
}

//function to create a new book
export async function createBook(formData: BookFormValues) {
  const {
    title,
    author,
    cover,
    description,
    publishedDate,
    purchaseDate,
    type,
    isbn = '',
  } = formData;
  const slug = await slugify(title);

  //upload cover image to vercel/blob
  let coverUrl = '';
  if (cover) {
    const coverFile = cover as File;
    const coverArrayBuffer = await coverFile.arrayBuffer();
    const coverBuffer = Buffer.from(coverArrayBuffer);
    const { url } = await put(`book_covers/${coverFile.name}`, coverBuffer, {
      access: 'public',
    });
    coverUrl = url;
  }

  //insert book into database
  await sql`
     INSERT INTO books
       (title, slug, author, description, published_date, purchase_date, type, isbn, cover)
     VALUES
       (${title}, ${slug}, ${author}, ${description}, ${publishedDate}, ${purchaseDate}, ${type}, ${isbn}, ${coverUrl})
       `;
}

//function to update a book
export async function updateBook(id: string, formData: BookFormValues) {
  const {
    title,
    author,
    cover,
    description,
    publishedDate,
    purchaseDate,
    type,
    isbn = '',
  } = formData;

  let coverUrl: string | undefined;

  if (cover) {
    const coverFile = cover as File;
    const coverArrayBuffer = await coverFile.arrayBuffer();
    const coverBuffer = Buffer.from(coverArrayBuffer);
    const { url } = await put(`book_covers/${coverFile.name}`, coverBuffer, {
      access: 'public',
    });
    coverUrl = url;
  }

  // Update book in database
  await sql`
    UPDATE books
    SET
      title = ${title},
      author = ${author},
      description = ${description},
      published_date = ${publishedDate},
      purchase_date = ${purchaseDate},
      type = ${type},
      isbn = ${isbn},
      ${coverUrl ? sql`cover = ${coverUrl},` : sql``}
    WHERE id = ${id}
  `;
}

//function to delete a book
export async function deleteBook(id: string) {
  await sql`
     DELETE FROM books WHERE id = ${id}
       `;
}
