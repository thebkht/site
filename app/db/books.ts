'use server';
import { put } from '@vercel/blob';
import { sql } from './postgres';
import { BookFormValues } from '../admin/library/create/book-form';

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
export async function updateBook(slug: string, formData: FormData) {
  const title = formData.get('title')?.toString() || '';
  const author = formData.get('author')?.toString() || '';
  const description = formData.get('description')?.toString() || '';
  const publishedDate = formData.get('publishedDate')?.toString() || '';
  const purchaseDate = formData.get('purchaseDate')?.toString() || '';
  const type = formData.get('type')?.toString() || '';
  const isbn = formData.get('isbn')?.toString() || null;
  const cover = formData.get('cover') || null;

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

  //update book in database
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
       cover = ${coverUrl}
     WHERE slug = ${slug}
       `;
}

//function to delete a book
export async function deleteBook(slug: string) {
  await sql`
     DELETE FROM books WHERE slug = ${slug}
       `;
}
