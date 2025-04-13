import { useMemo } from 'react';
import { useGetEventsQuery } from '../services/on-this-day-service';
import { useOnThisDaySelector } from './use-on-this-day-selector';
import { selectOnThisDayIsoDate } from '../selectors/select-on-this-day-iso-date';
import { getWikiOnThisDayEntries } from '../../../lib/get-wiki-on-this-day-entries';

export function useOnThisDayQuery({
  skipEntries = false,
}: { skipEntries?: boolean } = {}) {
  const isoDate = useOnThisDaySelector(selectOnThisDayIsoDate);

  const result = useGetEventsQuery(
    { isoDate },
    { skip: !isoDate, refetchOnMountOrArgChange: true },
  );

  const entries = useMemo(() => {
    if (skipEntries || !result.data) {
      return [];
    }

    return getWikiOnThisDayEntries(result.data);
  }, [skipEntries, result.data]);

  const isEmpty = result.isSuccess && entries.length === 0;
  const isRenderable = result.isSuccess && entries.length > 0;
  const isSkeleton = (result.isFetching && !isRenderable) || result.isLoading;

  return { ...result, entries, isEmpty, isRenderable, isSkeleton } as const;
}
