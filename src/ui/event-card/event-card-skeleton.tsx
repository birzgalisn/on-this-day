import { useId } from 'react';
import { PageCardSkeleton } from '~/ui/page-card/page-card-skeleton';

export type EventCardSkeletonProps = {
  pageCount?: number;
};

export function EventCardSkeleton({ pageCount = 2 }: EventCardSkeletonProps) {
  const eventId = useId();

  return (
    <article>
      <h2>&nbsp;</h2>
      <div>
        {Array.from({ length: pageCount }, (_, idx) => (
          <PageCardSkeleton key={`${eventId}-${idx}`} />
        ))}
      </div>
    </article>
  );
}
