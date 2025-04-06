import React, { useId } from 'react';
import { PaginatorContext, usePaginatorContext } from './paginator-context';
import { DEFAULT_PAGE } from '../constants/page';
import { ChevronLeft } from '../icons/chevron-left';
import { ChevronRight } from '../icons/chevron-right';
import { usePagination as useDefaultPagination } from '../hooks/use-pagination';
import { useVisiblePages } from '../hooks/use-visible-pages';
import { Button } from './button';
import './paginator.css';
import { buildInitialPagination } from '../lib/build-initial-pagination';

export type PaginatorProps<T> = {
  entries: T[];
  page?: number;
  size?: number;
  surrounding?: number;
  usePagination?: typeof useDefaultPagination;
} & React.PropsWithChildren;

export function Paginator<T>({
  usePagination = useDefaultPagination,
  entries,
  children,
  ...override
}: PaginatorProps<T>) {
  const paginator = usePagination({
    ...buildInitialPagination({ ...override, count: entries.length }),
    entries,
  });

  return (
    <PaginatorContext.Provider value={paginator}>
      {children}
    </PaginatorContext.Provider>
  );
}

export type PaginatorEntriesProps<T> = {
  children: ({ entry }: { entry: T }) => React.JSX.Element;
} & Omit<React.HTMLProps<HTMLDivElement>, 'children'>;

Paginator.Entries = function PaginatorEntries<T>({
  children,
  className = '',
  ...props
}: PaginatorEntriesProps<T>) {
  const [pagination] = usePaginatorContext();
  const paginatorId = useId();

  return (
    <div className={`list column ${className}`} {...props}>
      {pagination.paginated.map((entry, idx) => (
        <React.Fragment key={`${paginatorId}-${idx}`}>
          {children({ entry } as { entry: T })}
        </React.Fragment>
      ))}
    </div>
  );
};

export type PaginatorPagesProps = Pick<
  React.HTMLProps<HTMLDivElement>,
  'className'
>;

Paginator.Pages = function PaginatorPages({
  className = '',
}: PaginatorPagesProps) {
  const [pagination, updatePagination] = usePaginatorContext();

  const handlePageClick = (page: number) => () => updatePagination({ page });

  const visiblePages = useVisiblePages(pagination);

  return (
    <nav className={`paginator ${className}`}>
      <Button
        variant="secondary"
        onClick={handlePageClick(Math.max(pagination.page - 1, DEFAULT_PAGE))}
        disabled={pagination.page === DEFAULT_PAGE}
        aria-label="Previous page"
      >
        <ChevronLeft />
      </Button>

      {visiblePages.map((visiblePage) => (
        <Button
          key={visiblePage}
          variant={visiblePage === pagination.page ? 'primary' : 'secondary'}
          onClick={handlePageClick(visiblePage)}
          aria-label={`Page ${visiblePage}`}
        >
          {visiblePage}
        </Button>
      ))}

      <Button
        variant="secondary"
        onClick={handlePageClick(
          Math.min(pagination.page + 1, pagination.total),
        )}
        disabled={pagination.page === pagination.total}
        aria-label="Next page"
      >
        <ChevronRight />
      </Button>
    </nav>
  );
};
