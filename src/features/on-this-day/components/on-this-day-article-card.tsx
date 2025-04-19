import { useOnThisDayPagination } from '../hooks/use-on-this-day-pagination';
import {
  ArticleCard,
  ArticleCardPaginatorProps,
} from '../../../ui/article-card';
import { useArticleCardContext } from '../../../ui/article-card-context';
import { PaginatorContext } from '../../../ui/paginator-context';
import { buildInitialPagination } from '../../../lib/build-initial-pagination';

export const OnThisDayArticleCard = ArticleCard;

function Paginator({
  children,
  ...paginationOverride
}: ArticleCardPaginatorProps) {
  const { entries } = useArticleCardContext();

  const pagination = useOnThisDayPagination({
    ...buildInitialPagination({ entries, ...paginationOverride }),
    entries,
  });

  return (
    <PaginatorContext.Provider value={pagination}>
      {children}
    </PaginatorContext.Provider>
  );
}

OnThisDayArticleCard.Paginator = Object.assign(
  Paginator,
  ArticleCard.Paginator,
);
