import { createSlice } from '@reduxjs/toolkit';
import { OnThisDayType } from '../schema/on-this-day';
import { onThisDayApi } from '../services/on-this-day';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../constants/page';
import { isOnThisDayType } from '../lib/is-on-this-day-type';

export type State = {
  pagination: Partial<
    Record<OnThisDayType, { page: number; size: number; total: number }>
  >;
};

export const onThisDaySlice = createSlice({
  name: 'onThisDay',
  initialState: {
    pagination: {},
  } satisfies State as State,
  reducers(create) {
    return {
      paginate: create.preparedReducer(
        (args: { type: OnThisDayType; page: number; size?: number }) => ({
          payload: { ...args, size: args.size ?? DEFAULT_PAGE_SIZE },
        }),
        (state, action) => {
          const { type, ...pagination } = action.payload;

          if (!state.pagination[type]) {
            return;
          }

          Object.assign(state.pagination[type], pagination);
        },
      ),
    };
  },
  extraReducers(builder) {
    builder.addMatcher(
      onThisDayApi.endpoints.getEvents.matchFulfilled,
      (state, action) => {
        state.pagination = Object.entries(action.payload).reduce<
          State['pagination']
        >((acc, [type, events]) => {
          if (!isOnThisDayType(type)) {
            return acc;
          }

          acc[type] = {
            page: DEFAULT_PAGE,
            size: DEFAULT_PAGE_SIZE,
            total: Math.floor(events.length / DEFAULT_PAGE_SIZE),
          };

          return acc;
        }, {});
      },
    );
  },
});

export const { paginate } = onThisDaySlice.actions;
