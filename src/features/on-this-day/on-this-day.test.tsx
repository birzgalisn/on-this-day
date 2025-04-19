import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ZodError } from 'zod';
import {
  mockOnThisDayResponse,
  mockOnThisDayServerError,
  onThisDayServer,
} from './__tests__/on-this-day-node';
import { renderWithProviders } from './__tests__/on-this-day-utils';
import { getReadableOnThisDayError } from './lib/get-readable-on-this-day-error';
import { WIKI_ON_THIS_DAY_TYPE_MAP } from '../../constants/wiki-on-this-day-type-map';
import { OnThisDay } from './on-this-day';

describe('OnThisDay', () => {
  beforeAll(() => onThisDayServer.listen());

  afterEach(() => onThisDayServer.resetHandlers());

  afterAll(() => onThisDayServer.close());

  describe.each([WIKI_ON_THIS_DAY_TYPE_MAP.births])("section '%s'", (title) => {
    it('shows loading state', async () => {
      const result = renderOnThisDay();

      await userEvent.click(result.fetchEventsButton);

      expect(result.skeletonLoader).toBeInTheDocument();
    });

    it('shows loaded events', async () => {
      const result = renderOnThisDay();

      await userEvent.click(result.fetchEventsButton);

      expect(await screen.findByText(title)).toBeInTheDocument();
    });
  });

  it('shows user readable network error message', async () => {
    mockOnThisDayServerError();

    const result = renderOnThisDay();

    await userEvent.click(result.fetchEventsButton);

    expect(await result.networkErrorMessage).toBeVisible();
  });

  describe('when zod validation fails', () => {
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(vi.fn());

    let result: ReturnType<typeof renderOnThisDay>;

    beforeEach(async () => {
      mockOnThisDayResponse();

      result = renderOnThisDay();

      await userEvent.click(result.fetchEventsButton);
    });

    afterAll(() => {
      consoleMock.mockRestore();
    });

    it('shows user readable error message', async () => {
      expect(await result.zodErrorMessage).toBeVisible();
    });

    it('logs error within console', () => {
      expect(consoleMock).toHaveBeenCalledOnce();
    });
  });
});

function renderOnThisDay() {
  const result = renderWithProviders(<OnThisDay />);

  return {
    ...result,
    get fetchEventsButton() {
      return screen.getByText(new RegExp('What happened on this day?', 'i'));
    },
    get skeletonLoader() {
      return screen.getByLabelText(new RegExp('Loading events', 'i'));
    },
    get zodErrorMessage() {
      return screen.findByText(getReadableOnThisDayError(new ZodError([])));
    },
    get networkErrorMessage() {
      return screen.findByText(getReadableOnThisDayError(new Error()));
    },
  } as const;
}
