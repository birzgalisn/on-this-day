import { Button } from './button';
import { DEFAULT_PAGE } from '../constants/page';
import { ChevronLeft } from '../icons/chevron-left';
import { ChevronRight } from '../icons/chevron-right';
import { useVisiblePages } from '../hooks/use-visible-pages';
import './paginator.css';

export type PaginatorProps = {
  page: number;
  total: number;
  surrounding?: number;
  onChange: (page: number) => void;
} & Pick<React.HTMLProps<HTMLButtonElement>, 'className'>;

export function Paginator({
  page,
  total,
  onChange,
  surrounding = 2,
  className = '',
}: PaginatorProps) {
  const handlePageClick = (page: number) => () => onChange(page);

  const visiblePages = useVisiblePages(page, total, surrounding);

  return (
    <nav className={`paginator ${className}`}>
      <Button
        variant="secondary"
        onClick={() => onChange(Math.max(page - 1, DEFAULT_PAGE))}
        disabled={page === DEFAULT_PAGE}
      >
        <ChevronLeft />
      </Button>

      {visiblePages.map((visiblePage) => (
        <Button
          key={visiblePage}
          variant={visiblePage === page ? 'primary' : 'secondary'}
          className={visiblePage === page ? 'active' : ''}
          onClick={handlePageClick(visiblePage)}
        >
          {visiblePage}
        </Button>
      ))}

      <Button
        variant="secondary"
        onClick={() => onChange(Math.min(page + 1, total))}
        disabled={page === total}
      >
        <ChevronRight />
      </Button>
    </nav>
  );
}
