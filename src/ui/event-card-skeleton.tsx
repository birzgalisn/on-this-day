import { useId } from 'react';
import { PageCardSkeleton } from './page-card-skeleton';

export type EventCardSkeletonProps = {
  pageCount?: number;
};

export function EventCardSkeleton({ pageCount = 2 }: EventCardSkeletonProps) {
  const eventId = useId();

  return (
    <article className="list column full-width">
      <h2 className="skeleton title">&nbsp;</h2>

      <div className="list column full-width">
        {Array.from({ length: pageCount }, (_, idx) => (
          <PageCardSkeleton key={`${eventId}-${idx}`} />
        ))}
      </div>
    </article>
  );
}
