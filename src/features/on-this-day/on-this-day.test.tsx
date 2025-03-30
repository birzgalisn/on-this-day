import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  mockOnThisDayResponse,
  mockOnThisDayServerError,
  onThisDayServer,
} from './__tests__/on-this-day-node';
import { renderWithProviders } from './__tests__/on-this-day-utils';
import { ON_THIS_DAY_ZOD_ERROR_MAP } from './constants/on-this-day-zod-error-map';
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

  it('shows network error message', async () => {
    mockOnThisDayServerError();

    const result = renderOnThisDay();

    await userEvent.click(result.fetchEventsButton);

    expect(
      await screen.findByText(ON_THIS_DAY_ZOD_ERROR_MAP.false),
    ).toBeInTheDocument();
  });

  it('shows zod validation error message', async () => {
    mockOnThisDayResponse();

    const result = renderOnThisDay();

    await userEvent.click(result.fetchEventsButton);

    expect(
      await screen.findByText(ON_THIS_DAY_ZOD_ERROR_MAP.true),
    ).toBeInTheDocument();
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
  } as const;
}
