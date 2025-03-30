import { createSlice } from '@reduxjs/toolkit';
import { WikiOnThisDayType } from '../../../schema/wiki-on-this-day';
import { onThisDayApi } from '../services/on-this-day-service';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../../constants/page';
import { isWikiOnThisDayType } from '../../../lib/is-wiki-on-this-day-type';

export type State = {
  pagination: Partial<
    Record<WikiOnThisDayType, { page: number; size: number; total: number }>
  >;
};

const onThisDaySlice = createSlice({
  name: 'onThisDay',
  initialState: {
    pagination: {},
  } satisfies State as State,
  reducers(create) {
    return {
      paginate: create.preparedReducer(
        (args: { type: WikiOnThisDayType; page: number; size?: number }) => ({
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
          if (!isWikiOnThisDayType(type)) {
            return acc;
          }

          acc[type] = {
            page: DEFAULT_PAGE,
            size: DEFAULT_PAGE_SIZE,
            total: Math.ceil(events.length / DEFAULT_PAGE_SIZE),
          };

          return acc;
        }, {});
      },
    );
  },
});

export const { paginate } = onThisDaySlice.actions;

const onThisDayReducer = onThisDaySlice.reducer;

export default onThisDayReducer;
