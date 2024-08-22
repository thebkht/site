import { getViewsCount } from 'app/db/queries';
import ViewCounter from 'app/view-counter';
import { projects } from 'data/projects';
import { cache, Suspense } from 'react';
import { increment } from 'app/db/actions';
import { unstable_noStore as noStore } from 'next/cache';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((project) => project.slug === params.slug);
  if (!project) return null;

  return (
    <section className="space-y-2 flex flex-col items-center my-4">
      <img
        src={project.image}
        alt={project.title}
        className="w-24 h-24 object-cover border border-dashed border-neutral-200 dark:border-neutral-700"
      />
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        {project.title}
      </h1>

      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <Suspense fallback={<p className="h-5" />}>
          <Views slug={project.slug} />
        </Suspense>
      </div>
      <p className="text-neutral-600 dark:text-neutral-400">
        {project.description}
      </p>

      <a
        className="text-accent-600 dark:text-accent-400 my-3"
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        view project
      </a>
    </section>
  );
}

let incrementViews = cache(increment);

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();
  incrementViews(slug);
  return <ViewCounter allViews={views} slug={slug} />;
}
