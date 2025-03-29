import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithValidation } from '../lib/base-query-with-validation';
import { getPaddedDate } from '../lib/get-padded-date';
import { WikiOnThisDay, wikiOnThisDaySchema } from '../schema/wiki-on-this-day';

export const onThisDayApi = createApi({
  reducerPath: 'onThisDayApi',
  baseQuery: baseQueryWithValidation(
    fetchBaseQuery({
      baseUrl: 'https://en.wikipedia.org/api/rest_v1/feed/onthisday/',
    }),
  ),
  endpoints: (builder) => ({
    getEvents: builder.query<WikiOnThisDay, void>({
      query() {
        const [month, day] = getPaddedDate();
        return `all/${month}/${day}`;
      },
      extraOptions: {
        dataSchema: wikiOnThisDaySchema,
      },
    }),
  }),
});

export const { useLazyGetEventsQuery } = onThisDayApi;
