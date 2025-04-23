import { useId } from 'react';
import { EventCardSkeleton } from '~/ui/event-card-skeleton';

export type ArticleCardSkeletonProps = {
  eventCount?: number;
};

export function ArticleCardSkeleton({
  eventCount = 2,
}: ArticleCardSkeletonProps) {
  const articleId = useId();

  return (
    <section className="full-width" aria-label="Loading events">
      {Array.from({ length: eventCount }, (_, idx) => (
        <EventCardSkeleton key={`${articleId}-${idx}`} />
      ))}
    </section>
  );
}
