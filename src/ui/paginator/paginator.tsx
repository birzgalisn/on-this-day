import React, { useId } from 'react';
import * as stylex from '@stylexjs/stylex';
import { spacing, globalTokens as $, text } from '~/global-tokens.stylex';
import { PaginatorContext, usePaginatorContext } from '~/ui/paginator';
import { DEFAULT_PAGE } from '~/constants/page';
import { ChevronLeft } from '~/icons/chevron-left';
import { ChevronRight } from '~/icons/chevron-right';
import { buildInitialPagination } from '~/lib/build-initial-pagination';
import {
  Pagination,
  PaginationMetadata,
  usePagination as useDefaultPagination,
  UsePaginationType,
} from '~/hooks/use-pagination';
import { Button } from '~/ui/button/button';
import { Timeline } from '../timeline';

export type PaginatorProps<T> = {
  usePagination?: UsePaginationType;
  entries: T[];
} & Partial<Pick<PaginationMetadata, 'page' | 'size' | 'surrounding'>> &
  React.PropsWithChildren;

/**
 * https://careers.wolt.com/en/blog/engineering/injecting-hooks-into-react-components
 */
export function Paginator<T>({
  /* eslint-disable-next-line react-compiler/react-compiler */
  usePagination = useDefaultPagination,
  entries,
  children,
  ...paginationOverride
}: PaginatorProps<T>) {
  /* eslint-disable-next-line react-compiler/react-compiler */
  const pagination = usePagination({
    ...buildInitialPagination({ entries, ...paginationOverride }),
    entries,
  });

  return (
    <PaginatorContext.Provider value={pagination}>
      {children}
    </PaginatorContext.Provider>
  );
}

export type PaginatorEntriesProps<T> = {
  children: ({ entry }: { entry: T }) => React.JSX.Element;
};

Paginator.Entries = function PaginatorEntries<T>({
  children,
}: PaginatorEntriesProps<T>) {
  const [pagination] = usePaginatorContext();
  const paginatorId = useId();

  return (
    <div {...stylex.props(styles.entries)}>
      {pagination.paginated.map((entry, idx) => (
        <React.Fragment key={`${paginatorId}-${idx}`}>
          {children({ entry } as { entry: T })}
        </React.Fragment>
      ))}
    </div>
  );
};

export type PaginatorMoreProps = {
  direction: 'previous' | 'next';
  children: ({
    pagination,
    direction,
  }: {
    pagination: Pagination;
    direction: PaginatorMoreProps['direction'];
  }) => React.JSX.Element;
};

Paginator.More = function PaginatorMore({
  direction,
  children,
}: PaginatorMoreProps) {
  const [pagination, updatePagination] = usePaginatorContext();

  const handleMoreClick = () => {
    const page =
      direction === 'previous'
        ? Math.max(pagination.page - 1, DEFAULT_PAGE)
        : Math.min(pagination.page + 1, pagination.total);

    updatePagination({ page });
  };

  return (
    <div {...stylex.props(styles.more)}>
      <Timeline />
      <div onClick={handleMoreClick}>{children({ pagination, direction })}</div>
    </div>
  );
};

Paginator.Pages = function PaginatorPages() {
  const [pagination, updatePagination] = usePaginatorContext();

  const handlePageClick = (page: number) => () => updatePagination({ page });

  return (
    <nav {...stylex.props(styles.pages)}>
      <Button
        variant="secondary"
        onClick={handlePageClick(Math.max(pagination.page - 1, DEFAULT_PAGE))}
        disabled={pagination.page === DEFAULT_PAGE}
        aria-label="Previous page"
      >
        <ChevronLeft /> Previous
      </Button>

      <p {...stylex.props(styles.cursor)}>
        Page {pagination.page} of {pagination.total}
      </p>

      <Button
        variant="secondary"
        onClick={handlePageClick(
          Math.min(pagination.page + 1, pagination.total),
        )}
        disabled={pagination.page === pagination.total}
        aria-label="Next page"
      >
        Next <ChevronRight />
      </Button>
    </nav>
  );
};

const styles = stylex.create({
  entries: {
    display: 'flex',
    flexDirection: 'column',
  },
  pages: {
    alignItems: 'center',
    borderTopColor: '#f5f5f5',
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
    display: 'flex',
    gap: spacing.xxs,
    justifyContent: 'space-between',
    marginTop: spacing.xs,
    paddingBottom: spacing.xs,
    paddingTop: spacing.xs,
  },
  cursor: {
    fontFamily: $.fontSans,
    fontSize: text.p,
  },
  more: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
});
