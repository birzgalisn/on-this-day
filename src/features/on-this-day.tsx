import React, { useMemo } from 'react';
import { useLazyGetEventsQuery } from '../services/on-this-day';
import { WikiEvent } from '../schema/wiki-event';
import { WikiOnThisDayType } from '../schema/wiki-on-this-day';
import { isWikiOnThisDayType } from '../lib/is-wiki-on-this-day-type';
import { isZodError } from '../lib/is-zod-error';
import { Button } from '../ui/button';
import { ArticleCard } from '../ui/article-card';
import { ArticleCardSkeleton } from '../ui/article-card-skeleton';
import { Notification } from '../ui/notification';
import './on-this-day.css';

export function OnThisDay() {
  const [fetchTodaysEvents, result] = useOnThisDay();

  return (
    <OnThisDayContainer>
      {result.isQueryable && (
        <Button onClick={() => fetchTodaysEvents()}>
          What did happen on this day?
        </Button>
      )}

      {result.isSkeleton && <ArticleCardSkeleton />}

      {result.isError && (
        <Notification type="error">
          {ZOD_ERROR_HINT[`${isZodError(result.error)}`]}
        </Notification>
      )}

      {result.isEmpty && (
        <Notification type="info">
          No events found for today's date
        </Notification>
      )}

      {result.isRenderable && (
        <section className={`${result.isFetching ? 'pulse' : ''}`}>
          {result.entries.map(([type, entries]) => (
            <ArticleCard key={type} {...{ type, entries }}>
              <ArticleCard.Title />
              <ArticleCard.Entries />
              <ArticleCard.Paginator />
            </ArticleCard>
          ))}
        </section>
      )}
    </OnThisDayContainer>
  );
}

function useOnThisDay() {
  const [trigger, result] = useLazyGetEventsQuery();

  const entries = useMemo(() => {
    if (!result.data) {
      return [];
    }

    return Object.entries(result.data).filter(([type]) =>
      isWikiOnThisDayType(type),
    ) as [type: WikiOnThisDayType, entries: WikiEvent[]][];
  }, [result.data]);

  const isQueryable = result.isUninitialized || result.isError;
  const isEmpty = result.isSuccess && entries.length === 0;
  const isRenderable = result.isSuccess && entries.length > 0;
  const isSkeleton = (result.isFetching && !isRenderable) || result.isLoading;

  return [
    trigger,
    { ...result, entries, isQueryable, isEmpty, isRenderable, isSkeleton },
  ] as const;
}

function OnThisDayContainer({
  className = '',
  children,
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div className={`on-this-day ${className}`} {...props}>
      <h1>On this day</h1>

      {children}
    </div>
  );
}

const ZOD_ERROR_HINT = Object.freeze({
  true: 'Response structure did not match the schema. Please report this issue',
  false: 'Something went wrong. Could not fetch events for today',
}) satisfies Record<`${true}` | `${false}`, string>;
