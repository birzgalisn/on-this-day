import { createSlice } from '@reduxjs/toolkit';
import { onThisDayApi } from '../services/on-this-day-service';
import { WikiOnThisDayType } from '../../../schema/wiki-on-this-day';
import { PaginationWithoutPaginated } from '../../../hooks/use-pagination';
import { isWikiOnThisDayType } from '../../../lib/is-wiki-on-this-day-type';
import { buildInitialPagination } from '../../../lib/build-initial-pagination';

export type State = {
  pagination: Partial<Record<WikiOnThisDayType, PaginationWithoutPaginated>>;
};

const onThisDaySlice = createSlice({
  name: 'onThisDay',
  initialState: {
    pagination: {},
  } satisfies State as State,
  reducers(create) {
    return {
      paginate: create.reducer<
        { type: WikiOnThisDayType } & Partial<PaginationWithoutPaginated>
      >((state, action) => {
        const { type, ...pagination } = action.payload;

        if (!state.pagination[type]) {
          return;
        }

        state.pagination[type] = { ...state.pagination[type], ...pagination };
      }),
    };
  },
  extraReducers(builder) {
    builder.addMatcher(
      onThisDayApi.endpoints.getEvents.matchFulfilled,
      (state, action) => {
        state.pagination = Object.entries(action.payload).reduce<
          State['pagination']
        >((pagination, [type, events]) => {
          if (!isWikiOnThisDayType(type)) {
            return pagination;
          }

          pagination[type] = buildInitialPagination({ count: events.length });

          return pagination;
        }, {});
      },
    );
  },
});

export const { paginate } = onThisDaySlice.actions;

const onThisDayReducer = onThisDaySlice.reducer;

export default onThisDayReducer;
