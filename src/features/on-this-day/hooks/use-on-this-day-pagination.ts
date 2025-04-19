import { useOnThisDayDispatch } from './use-on-this-day-dispatch';
import { useOnThisDaySelector } from './use-on-this-day-selector';
import { paginate } from '../slices/on-this-day-slice';
import {
  PaginationMetadata,
  UsePaginationProps,
  UsePaginationReturn,
} from '../../../hooks/use-pagination';
import { useArticleCardContext } from '../../../ui/article-card-context';
import { getPageEntries } from '../../../lib/get-page-entries';

export function useOnThisDayPagination({
  entries,
  ...initialPagination
}: UsePaginationProps): UsePaginationReturn {
  const dispatch = useOnThisDayDispatch();

  const { type } = useArticleCardContext();

  const pagination = useOnThisDaySelector(
    (state) => state.onThisDay.pagination[type] ?? initialPagination,
  );

  const updatePagination = (newPagination: Partial<PaginationMetadata>) => {
    dispatch(paginate({ type, ...newPagination }));
  };

  const paginated = getPageEntries({ entries, ...pagination });

  return [{ ...pagination, paginated }, updatePagination] as const;
}
