import { useMemo } from 'react';
import { isWikiOnThisDayType } from '../../../lib/is-wiki-on-this-day-type';
import { useLazyGetEventsQuery } from '../services/on-this-day-service';
import { WikiOnThisDayType } from '../../../schema/wiki-on-this-day';
import { WikiEvent } from '../../../schema/wiki-event';

export function useOnThisDay() {
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
