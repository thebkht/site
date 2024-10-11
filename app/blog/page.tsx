import Link from 'next/link';
import { Suspense } from 'react';
import ViewCounter from 'app/view-counter';
import { getViewsCount } from 'app/db/queries';
import { getBlogPosts } from 'app/db/blog';
import { Metadata } from 'next';
import { AnimatedName } from 'app/components/nav';
import { formatDate } from 'utils/format';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
};

export default function BlogPage() {
  let allBlogs = getBlogPosts();

  return (
    <section>
      <h1 className="font-medium pt-12 mb-0 fade-in">Blog</h1>
      <AnimatedName />
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/p/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <p className="text-gray-800 dark:text-gray-300 font-medium tracking-tight">
                {post.metadata.title}
              </p>
              {/* <div className="flex gap-1.5 items-center text-sm">
                <Suspense fallback={<p className="h-5" />}>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(post.metadata.publishedAt)}
                  </p>
                </Suspense>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ·
                </span>
                <Suspense fallback={<p className="h-6" />}>
                  <Views slug={post.slug} />
                </Suspense>
              </div> */}

              <p className="text-gray-600 dark:text-gray-400 line-clamp-1">
                {post.metadata.summary}
              </p>
            </div>
          </Link>
        ))}
    </section>
  );
}

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();

  return <ViewCounter allViews={views} slug={slug} />;
}
