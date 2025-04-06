import { useReducer } from 'react';

export type UsePaginationProps = {
  page: number;
  size: number;
  surrounding: number;
  total: number;
  entries: unknown[];
};

export type Pagination = { paginated: unknown[] } & Pick<
  UsePaginationProps,
  'page' | 'size' | 'total' | 'surrounding'
>;

export type PaginationWithoutPaginated = Omit<Pagination, 'paginated'>;

export type UpdatePagination = (
  newPagination: Partial<PaginationWithoutPaginated>,
) => void;

export type UsePaginationType = Readonly<
  [pagination: Pagination, updatePagination: UpdatePagination]
>;

export function usePagination({
  entries,
  ...initialState
}: UsePaginationProps): UsePaginationType {
  const [pagination, updatePagination] = useReducer(
    (state, newPagination: Partial<PaginationWithoutPaginated>) => ({
      ...state,
      ...newPagination,
    }),
    initialState,
  );

  const start = (pagination.page - 1) * pagination.size;
  const paginated = entries.slice(start, start + pagination.size);

  return [{ ...pagination, paginated }, updatePagination] as const;
}
