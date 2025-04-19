import { render } from '@testing-library/react';
import { Paginator, PaginatorProps } from './paginator';

describe('Paginator', () => {
  it('is visible', () => {
    const result = renderPaginator();

    expect(result.paginator).toBeVisible();
  });

  it("has the correct class of 'paginator'", () => {
    const result = renderPaginator();

    expect(result.paginator).toHaveClass('paginator');
  });

  it('shows only one page as active', () => {
    const result = renderPaginator();

    const activeButtons = Array.from(
      result.paginator.querySelectorAll('button'),
    ).filter((button) => button.classList.contains('button--primary'));

    expect(activeButtons).toHaveLength(1);
  });

  it.each([
    [1, 10, 2, [1, 2, 3]],
    [5, 10, 2, [3, 4, 5, 6, 7]],
    [10, 10, 2, [8, 9, 10]],
  ])(
    `shows the correct pages when page is %i, total is %i, surrounding is %i`,
    (page, total, surrounding, visible) => {
      const result = renderPaginator({ page, total, surrounding });

      const pages = Array.from(
        result.paginator.querySelectorAll('button[aria-label^="Page"]'),
      ).map((button) => Number(button.textContent));

      expect(pages).toEqual(visible);
    },
  );

  describe.each([
    ['Previous page', 1, 10],
    ['Next page', 10, 10],
  ])(`'%s' button`, (aria, page, total) => {
    it(`is disabled when page is ${page}, total is ${total}`, () => {
      const { paginator } = renderPaginator({ page, total });

      const button = paginator.querySelector(`button[aria-label="${aria}"]`);

      expect(button).toBeDisabled();
    });
  });
});

const PAGINATOR_PROPS = Object.freeze({
  page: 5,
  size: 2,
  surrounding: 2,
  total: 10,
});

function renderPaginator({
  page = PAGINATOR_PROPS.page,
  size = PAGINATOR_PROPS.size,
  total = PAGINATOR_PROPS.total,
  ...props
}: Partial<{ total?: number } & PaginatorProps<void>> = {}) {
  const result = render(
    <Paginator {...{ entries: Array(total * size), page, size }} {...props}>
      <Paginator.Pages />
    </Paginator>,
  );

  return {
    ...result,
    get paginator() {
      return result.getByRole('navigation');
    },
  } as const;
}
