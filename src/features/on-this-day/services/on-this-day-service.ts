import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { format } from 'date-fns';
import { baseQueryWithValidation } from '~/lib/base-query-with-validation';
import { getLeapYearIsoDate } from '~/lib/get-leap-year-iso-date';
import { WikiOnThisDay, wikiOnThisDaySchema } from '~/schema/wiki-on-this-day';

export const onThisDayApi = createApi({
  reducerPath: 'onThisDayApi',
  baseQuery: baseQueryWithValidation(
    fetchBaseQuery({
      baseUrl: 'https://en.wikipedia.org/api/rest_v1/feed/onthisday/',
    }),
  ),
  endpoints: (builder) => ({
    getEvents: builder.query<WikiOnThisDay, { isoDate?: string } | void>({
      query({ isoDate = getLeapYearIsoDate() } = {}) {
        return `all/${format(isoDate, 'MM/dd')}`;
      },
      extraOptions: {
        dataSchema: wikiOnThisDaySchema,
      },
    }),
  }),
});

export const { useGetEventsQuery } = onThisDayApi;
