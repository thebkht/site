import { projects } from 'data/projects';
import Link from 'next/link';
import { Suspense } from 'react';
import { getViewsCount } from 'app/db/queries';
import ViewCounter from 'app/view-counter';

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        my projects
      </h1>

      {projects.length === 0 ? (
        <p className="text-neutral-600 dark:text-neutral-400">
          No projects yet.
        </p>
      ) : (
        projects.map((project) => (
          <Link
            key={project.slug}
            className="flex gap-2 items-center mb-4"
            href={`/projects/${project.slug}`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-12 h-12 object-cover border border-dashed border-neutral-200 dark:border-neutral-700"
            />
            <div className="w-full flex flex-col">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {project.title}
              </p>
              <Suspense fallback={<p className="h-6" />}>
                <Views slug={project.slug} />
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
