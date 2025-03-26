import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithValidation } from '../lib/base-query-with-validation';
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
        const [month, day] = new Date()
          .toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
          })
          .split('/');

        return `en/onthisday/all/${month}/${day}`;
      },
      extraOptions: {
        dataSchema: onThisDaySchema,
      },
    }),
  }),
});

export const { useLazyGetEventsQuery } = onThisDayApi;
