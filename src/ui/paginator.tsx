import React, { useId, useState } from 'react';
import { PaginatorContext, usePaginatorContext } from './paginator-context';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../constants/page';
import { ChevronLeft } from '../icons/chevron-left';
import { ChevronRight } from '../icons/chevron-right';
import { useVisiblePages } from '../hooks/use-visible-pages';
import { Button } from './button';
import './paginator.css';

export type PaginatorProps<T> = {
  entries: T[];
  size?: number;
  usePage?: (
    initialPage: number,
  ) => Readonly<[page: number, setPage: (page: number) => void]>;
} & React.PropsWithChildren;

export function Paginator<T>({
  entries,
  size = DEFAULT_PAGE_SIZE,
  usePage = useState,
  children,
}: PaginatorProps<T>) {
  const [page, setPage] = usePage(DEFAULT_PAGE);
  const total = Math.ceil(entries.length / size);

  return (
    <PaginatorContext.Provider value={{ entries, page, size, total, setPage }}>
      {children}
    </PaginatorContext.Provider>
  );
}

Paginator.Entries = function PaginatorEntries<T>({
  children,
  className = '',
  ...props
}: {
  children: ({ entry }: { entry: T }) => React.JSX.Element;
} & Omit<React.HTMLProps<HTMLDivElement>, 'children'>) {
  const { entries, page, size } = usePaginatorContext();
  const paginatorId = useId();

  const start = (page - 1) * size;

  return (
    <div className={`list column ${className}`} {...props}>
      {entries.slice(start, start + size).map((entry, idx) => (
        <React.Fragment key={`${paginatorId}-${idx}`}>
          {children({ entry } as { entry: T })}
        </React.Fragment>
      ))}
    </div>
  );
};

Paginator.Pages = function PaginatorPages({
  surrounding = 2,
  className = '',
}: {
  surrounding?: number;
} & Pick<React.HTMLProps<HTMLDivElement>, 'className'>) {
  const { page, total, setPage } = usePaginatorContext();

  const handlePageClick = (page: number) => () => setPage(page);

  const visiblePages = useVisiblePages(page, total, surrounding);

  return (
    <nav className={`paginator ${className}`}>
      <Button
        variant="secondary"
        onClick={handlePageClick(Math.max(page - 1, DEFAULT_PAGE))}
        disabled={page === DEFAULT_PAGE}
        aria-label="Previous page"
      >
        <ChevronLeft />
      </Button>

      {visiblePages.map((visiblePage) => (
        <Button
          key={visiblePage}
          variant={visiblePage === page ? 'primary' : 'secondary'}
          onClick={handlePageClick(visiblePage)}
          aria-label={`Page ${visiblePage}`}
        >
          {visiblePage}
        </Button>
      ))}

      <Button
        variant="secondary"
        onClick={handlePageClick(Math.min(page + 1, total))}
        disabled={page === total}
        aria-label="Next page"
      >
        <ChevronRight />
      </Button>
    </nav>
  );
};
