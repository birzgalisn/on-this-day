import { useOnThisDayDispatch } from './use-on-this-day-dispatch';
import { useOnThisDaySelector } from './use-on-this-day-selector';
import { paginate } from '../slices/on-this-day-slice';
import { useArticleCardContext } from '../../../ui/article-card-context';

export function useOnThisDayPage(initialPage: number) {
  const dispatch = useOnThisDayDispatch();

  const { type } = useArticleCardContext();

  const page = useOnThisDaySelector(
    (state) => state.onThisDay.pagination[type]?.page ?? initialPage,
  );

  const setPage = (page: number) => {
    dispatch(paginate({ type, page }));
  };

  return [page, setPage] as const;
}
