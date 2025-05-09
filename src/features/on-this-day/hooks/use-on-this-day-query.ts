import { useGetEventsQuery } from '~/features/on-this-day/services/on-this-day-service';
import { useOnThisDaySelector } from '~/features/on-this-day/hooks/use-on-this-day-selector';
import { selectOnThisDayParamsIsoDate } from '~/features/on-this-day/selectors/select-on-this-day-params-date';
import { selectOnThisDayParamsType } from '../selectors/select-on-this-day-params-type';

export function useOnThisDayQuery() {
  const isoDate = useOnThisDaySelector(selectOnThisDayParamsIsoDate);
  const type = useOnThisDaySelector(selectOnThisDayParamsType);

  const result = useGetEventsQuery(
    { type, isoDate },
    { skip: !isoDate, refetchOnMountOrArgChange: true },
  );

  const entries = result.data?.[type] ?? [];
  const isEmpty = result.isSuccess && entries.length === 0;
  const isRenderable = result.isSuccess && entries.length > 0;
  const isSkeleton = (result.isFetching && !isRenderable) || result.isLoading;

  return { ...result, entries, isEmpty, isRenderable, isSkeleton } as const;
}
