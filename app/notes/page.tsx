import Link from 'next/link';
import { Suspense } from 'react';
import ViewCounter from '../view-counter';
import { getNotes, getViewsCount } from 'app/db/queries';

export const metadata = {
  title: 'Notes',
  description: 'Read my notes on software development, design, and more.',
};

export default async function NotePage() {
  let allNotes = await getNotes();

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        read my notes
      </h1>

      {allNotes.length === 0 ? (
        <p className="text-neutral-600 dark:text-neutral-400">No notes yet.</p>
      ) : (
        allNotes.map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/notes/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.title}
              </p>
              <Suspense fallback={<p className="h-6" />}>
                <Views slug={post.slug} />
              </Suspense>
            </div>
          </Link>
        ))
      )}
    </section>
  );
}

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();

  return <ViewCounter allViews={views} slug={slug} />;
}
