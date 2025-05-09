import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_ON_THIS_DAY_PAGE_SIZE } from '~/features/on-this-day/constants/page';
import { onThisDayApi } from '~/features/on-this-day/services/on-this-day-service';
import { WikiOnThisDayType } from '~/schemas/wiki-on-this-day';
import { PaginationMetadata } from '~/hooks/use-pagination';
import { buildInitialPagination } from '~/lib/build-initial-pagination';
import { getWikiOnThisDayEntries } from '~/lib/get-wiki-on-this-day-entries';

export type OnThisDayPaginationState = {
  pagination: Partial<Record<WikiOnThisDayType, PaginationMetadata>>;
};

const onThisDayPaginationSlice = createSlice({
  name: 'onThisDayPagination',
  initialState: {
    pagination: {},
  } satisfies OnThisDayPaginationState as OnThisDayPaginationState,
  reducers(create) {
    return {
      paginate: create.reducer<
        { type: WikiOnThisDayType } & Partial<PaginationMetadata>
      >((state, action) => {
        const { type, ...pagination } = action.payload;
        if (state.pagination[type]) {
          state.pagination[type] = { ...state.pagination[type], ...pagination };
        }
      }),
    };
  },
  extraReducers(builder) {
    builder.addMatcher(
      onThisDayApi.endpoints.getEvents.matchFulfilled,
      (state, action) => {
        state.pagination = getWikiOnThisDayEntries(action.payload).reduce<
          OnThisDayPaginationState['pagination']
        >(
          (pagination, [type, events]) => ({
            ...pagination,
            [type]: buildInitialPagination({
              size: DEFAULT_ON_THIS_DAY_PAGE_SIZE,
              entries: events,
            }),
          }),
          {},
        );
      },
    );
  },
});

export const { paginate } = onThisDayPaginationSlice.actions;

export const onThisDayPaginationReducer = onThisDayPaginationSlice.reducer;
