import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithValidation } from '../lib/base-query-with-validation';
import { getPaddedDate } from '../lib/get-padded-date';
import { OnThisDay, onThisDaySchema } from '../schema/on-this-day';

export const onThisDayApi = createApi({
  reducerPath: 'onThisDayApi',
  baseQuery: baseQueryWithValidation(
    fetchBaseQuery({
      baseUrl: 'https://api.wikimedia.org/feed/v1/wikipedia/',
    }),
  ),
  endpoints: (builder) => ({
    getEvents: builder.query<OnThisDay, void>({
      query() {
        const [month, day] = getPaddedDate();
        return `en/onthisday/all/${month}/${day}`;
      },
      extraOptions: {
        dataSchema: onThisDaySchema,
      },
    }),
  }),
});

export const { useLazyGetEventsQuery } = onThisDayApi;
