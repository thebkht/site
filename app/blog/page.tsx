import { Link } from 'next-view-transitions';
import { getBlogPosts } from 'app/db/blog';
import { Metadata } from 'next';
import { AnimatedName } from 'app/components/nav';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Thoughts on software development, design, and more.',
};

export default function BlogPage() {
  let allBlogs = getBlogPosts();

  return (
    <section>
      <h1 className="font-medium pt-12 mb-0 fade-in">Writing</h1>
      <AnimatedName />
      <ul className="text-foreground list-disc pl-5 space-y-1.5">
        {allBlogs.map((post) => (
          <li key={post.slug} className="pl-1">
            <Link
              href={`/p/${post.slug}`}
              className="text-blue-500 hover:text-blue-700"
            >
              {post.metadata.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
