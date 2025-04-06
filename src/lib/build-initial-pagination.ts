import { PaginationWithoutPaginated } from '../hooks/use-pagination';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SURROUNDING,
} from '../constants/page';

export type BuildInitialPaginationProps = {
  count: number;
} & Partial<PaginationWithoutPaginated>;

export function buildInitialPagination({
  count,
  page = DEFAULT_PAGE,
  size = DEFAULT_PAGE_SIZE,
  surrounding = DEFAULT_PAGE_SURROUNDING,
}: BuildInitialPaginationProps) {
  return {
    page,
    size,
    surrounding,
    total: Math.ceil(count / size),
  } satisfies PaginationWithoutPaginated;
}
