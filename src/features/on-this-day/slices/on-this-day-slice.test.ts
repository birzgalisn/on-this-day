import { act } from '@testing-library/react';
import { onThisDayServer } from '../__tests__/on-this-day-node';
import { renderHookWithProviders } from '../__tests__/on-this-day-utils';
import { DEFAULT_PAGE_SIZE } from '../../../constants/page';
import { useLazyGetEventsQuery } from '../services/on-this-day-service';
import { RootOnThisDayState } from '../store/on-this-day-store';
import onThisDayReducer, { paginate } from './on-this-day-slice';

const BIRTHS = {
  page: 1,
  total: 100,
  size: DEFAULT_PAGE_SIZE,
} satisfies RootOnThisDayState['onThisDay']['pagination']['births'];

const STATE = {
  pagination: { births: BIRTHS },
} satisfies RootOnThisDayState['onThisDay'];

describe('OnThisDay slice', () => {
  beforeAll(() => onThisDayServer.listen());

  afterEach(() => onThisDayServer.resetHandlers());

  afterAll(() => onThisDayServer.close());

  it('should build pagiante action with default page size', () => {
    const args = { type: 'births', page: 2 } as const;

    const action = paginate(args);

    const expected = {
      type: 'onThisDay/paginate',
      payload: { ...args, size: DEFAULT_PAGE_SIZE },
    } as const;

    expect(action).toEqual(expected);
  });

  it('should paginate initialized events', () => {
    const action = paginate({ type: 'births', page: 2 });

    const expected = {
      pagination: { births: { ...BIRTHS, page: action.payload.page } },
    } as const;

    expect(onThisDayReducer(STATE, action)).toEqual(expected);
  });

  it('should initialize pagination after fetching events', async () => {
    const { result, store } = renderHookWithProviders(useLazyGetEventsQuery);

    const [triggerFetch] = result.current;

    await act(triggerFetch);

    const { pagination } = store.getState().onThisDay;

    const expected = { births: { page: 1, size: 2, total: 3 } } as const;

    expect(pagination).toEqual(expected);
  });
});
