import { cn } from 'lib/utils';

export default function ViewCounter({
  slug,
  allViews,
  className,
}: {
  slug: string;
  allViews: {
    slug: string;
    count: number;
  }[];
  trackView?: boolean;
  className?: string;
}) {
  const viewsForSlug = allViews && allViews.find((view) => view.slug === slug);
  const number = new Number(viewsForSlug?.count || 0);

  return (
    <p
      className={cn('text-muted-foreground', className)}
    >{`${number.toLocaleString()} views`}</p>
  );
}
