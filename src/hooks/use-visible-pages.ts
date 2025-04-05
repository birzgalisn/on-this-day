import { useMemo } from 'react';

export function useVisiblePages(
  page: number,
  total: number,
  surrounding = 2,
): Readonly<number[]> {
  return useMemo(() => {
    const start = Math.max(1, page - surrounding);
    const end = Math.min(total, page + surrounding);

    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  }, [page, total, surrounding]);
}
