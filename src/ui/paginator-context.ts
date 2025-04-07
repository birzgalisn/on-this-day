import { createContext, useContext } from 'react';
import { UsePaginationReturn } from '../hooks/use-pagination';

export const PaginatorContext = createContext<UsePaginationReturn | null>(null);

export function usePaginatorContext() {
  const pagiantorContext = useContext(PaginatorContext);

  if (!pagiantorContext) {
    throw new Error(
      '`usePaginatorContext` must be used within a `Paginator.*`',
    );
  }

  return pagiantorContext;
}
