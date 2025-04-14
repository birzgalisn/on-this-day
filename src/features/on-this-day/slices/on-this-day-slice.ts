import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_ON_THIS_DAY_PAGE_SIZE } from '../constants/page';
import { onThisDayApi } from '../services/on-this-day-service';
import { WikiOnThisDayType } from '../../../schema/wiki-on-this-day';
import { PaginationMetadata } from '../../../hooks/use-pagination';
import { buildInitialPagination } from '../../../lib/build-initial-pagination';
import { getWikiOnThisDayEntries } from '../../../lib/get-wiki-on-this-day-entries';

export type OnThisDayState = {
  isoDate?: string;
  pagination: Partial<Record<WikiOnThisDayType, PaginationMetadata>>;
};

const onThisDaySlice = createSlice({
  name: 'onThisDay',
  initialState: {
    isoDate: undefined,
    pagination: {},
  } satisfies OnThisDayState as OnThisDayState,
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
      setIsoDate: create.reducer<{ isoDate: string }>((state, action) => {
        state.isoDate = action.payload.isoDate;
      }),
    };
  },
  extraReducers(builder) {
    builder.addMatcher(
      onThisDayApi.endpoints.getEvents.matchFulfilled,
      (state, action) => {
        state.pagination = getWikiOnThisDayEntries(action.payload).reduce<
          OnThisDayState['pagination']
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

export const { paginate, setIsoDate } = onThisDaySlice.actions;

export const onThisDayReducer = onThisDaySlice.reducer;
