import { createContext, useContext } from 'react';

export const PaginatorContext = createContext<{
  entries: unknown[];
  page: number;
  size: number;
  total: number;
  setPage: (page: number) => void;
} | null>(null);

export function usePaginatorContext() {
  const pagiantorContext = useContext(PaginatorContext);

  if (!pagiantorContext) {
    throw new Error(
      '`usePaginatorContext` must be used within a `Paginator.*`',
    );
  }

  return pagiantorContext;
}
