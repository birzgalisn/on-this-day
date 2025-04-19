import { useReducer } from 'react';
import { getPageEntries } from '../lib/get-page-entries';

export type PaginationMetadata = {
  page: number;
  size: number;
  surrounding: number;
  total: number;
};

export type Pagination = { paginated: unknown[] } & PaginationMetadata;

export type UpdatePagination = (
  newPagination: Partial<PaginationMetadata>,
) => void;

export type UsePaginationReturn = Readonly<
  [pagination: Pagination, updatePagination: UpdatePagination]
>;

export type UsePaginationProps = { entries: unknown[] } & PaginationMetadata;

export type UsePaginationType = (
  initialPagination: UsePaginationProps,
) => UsePaginationReturn;

export function usePagination({
  entries,
  ...initialState
}: UsePaginationProps): UsePaginationReturn {
  const [pagination, updatePagination] = useReducer(
    (state, newPagination: Partial<PaginationMetadata>) => ({
      ...state,
      ...newPagination,
    }),
    initialState,
  );

  const paginated = getPageEntries({ entries, ...pagination });

  return [{ ...pagination, paginated }, updatePagination] as const;
}
