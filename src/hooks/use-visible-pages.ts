import { useMemo } from 'react';
import { PaginationWithoutPaginated } from './use-pagination';

export type UseVisiblePagesProps = Pick<
  PaginationWithoutPaginated,
  'page' | 'total' | 'surrounding'
>;

export function useVisiblePages({
  page,
  total,
  surrounding,
}: UseVisiblePagesProps): Readonly<number[]> {
  return useMemo(() => {
    const start = Math.max(1, page - surrounding);
    const end = Math.min(total, page + surrounding);

    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  }, [page, total, surrounding]);
}
