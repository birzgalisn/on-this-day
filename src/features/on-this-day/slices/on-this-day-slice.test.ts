import { waitFor } from '@testing-library/react';
import { onThisDayServer } from '../__tests__/on-this-day-node';
import { renderHookWithProviders } from '../__tests__/on-this-day-utils';
import { DEFAULT_ON_THIS_DAY_PAGE_SIZE } from '../constants/page';
import { useGetEventsQuery } from '../services/on-this-day-service';
import { RootOnThisDayState } from '../store/on-this-day-store';
import { onThisDayReducer, paginate } from './on-this-day-slice';
import { PaginationMetadata } from '../../../hooks/use-pagination';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SURROUNDING,
} from '../../../constants/page';

const PAGINATION = {
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  surrounding: DEFAULT_PAGE_SURROUNDING,
  total: 3,
} satisfies PaginationMetadata;

const STATE = {
  pagination: { births: PAGINATION },
} satisfies RootOnThisDayState['onThisDay'];

describe('onThisDaySlice', () => {
  beforeAll(() => onThisDayServer.listen());

  afterEach(() => onThisDayServer.resetHandlers());

  afterAll(() => onThisDayServer.close());

  it('should build pagiante action with default page size', () => {
    const args = { type: 'births', page: 2 } as const;

    const action = paginate(args);

    const expected = { type: 'onThisDay/paginate', payload: args } as const;

    expect(action).toEqual(expected);
  });

  it('should paginate initialized events', () => {
    const action = paginate({ type: 'births', page: 2 });

    const expected = {
      pagination: { births: { ...PAGINATION, page: action.payload.page } },
    } as const;

    expect(onThisDayReducer(STATE, action)).toEqual(expected);
  });

  it('should initialize pagination after fetching events', async () => {
    const { store, result } = renderHookWithProviders(useGetEventsQuery);

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    const { pagination } = store.getState().onThisDay;

    const expected = {
      births: { ...PAGINATION, size: DEFAULT_ON_THIS_DAY_PAGE_SIZE },
      selected: { ...PAGINATION, size: DEFAULT_ON_THIS_DAY_PAGE_SIZE },
      deaths: { ...PAGINATION, size: DEFAULT_ON_THIS_DAY_PAGE_SIZE },
      events: { ...PAGINATION, size: DEFAULT_ON_THIS_DAY_PAGE_SIZE },
      holidays: { ...PAGINATION, size: DEFAULT_ON_THIS_DAY_PAGE_SIZE },
    } as const;

    expect(pagination).toEqual(expected);
  });
});
