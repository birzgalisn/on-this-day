import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    const onChange = vi.fn();
    let button: HTMLElement | null = null;

    beforeEach(() => {
      const { paginator } = renderPaginator({ page, total, onChange });
      button = paginator.querySelector(`button[aria-label="${aria}"]`);
    });

    afterEach(vi.clearAllMocks);

    it(`is disabled when page is ${page}, total is ${total}`, () => {
      expect(button).toBeDisabled();
    });

    it(`can not be clicked when page ${page}, total is ${total}`, async () => {
      if (!button) {
        throw new Error(`There should be a '${aria}' button`);
      }

      await userEvent.click(button);

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  it.each([
    ['Previous page', PAGINATOR_PROPS.page - 1],
    ['Next page', PAGINATOR_PROPS.page + 1],
    [`Page ${PAGINATOR_PROPS.page - 1}`, PAGINATOR_PROPS.page - 1],
    [`Page ${PAGINATOR_PROPS.page + 1}`, PAGINATOR_PROPS.page + 1],
  ])(
    `handles '%s' click correctly when page is ${PAGINATOR_PROPS.page}, total is ${PAGINATOR_PROPS.total}`,
    async (aria, result) => {
      const onChange = vi.fn();
      const { paginator } = renderPaginator({ onChange });
      const button = paginator.querySelector(`button[aria-label="${aria}"]`);

      if (!button) {
        throw new Error(`There should be a '${aria}' button`);
      }

      await userEvent.click(button);

      expect(onChange).toHaveBeenCalledExactlyOnceWith(result);
    },
  );
});

const PAGINATOR_PROPS = Object.freeze({
  page: 5,
  total: 10,
  onChange: vi.fn(),
} satisfies PaginatorProps);

function renderPaginator({ ...props }: Partial<PaginatorProps> = {}) {
  const result = render(<Paginator {...PAGINATOR_PROPS} {...props} />);

  return {
    ...result,
    get paginator() {
      return result.getByRole('navigation');
    },
  } as const;
}
