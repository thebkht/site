import Link from 'next/link';
import { Suspense } from 'react';
import ViewCounter from './../view-counter';
import { getNotes, getViewsCount } from 'app/db/queries';

export const metadata = {
  title: 'Notes',
  description: 'Read my notes on software development, design, and more.',
};

export default async function NotePage() {
  let allNotes = await getNotes();

  return (
    <section>
      {allNotes.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No notes yet.</p>
      ) : (
        allNotes.map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/notes/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <p className="text-gray-900 dark:text-gray-100 tracking-tight">
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
