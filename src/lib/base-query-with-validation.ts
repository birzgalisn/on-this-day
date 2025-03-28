import { ZodError, ZodSchema } from 'zod';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';

type BaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError | ZodError,
  { argumentSchema?: ZodSchema; dataSchema?: ZodSchema },
  FetchBaseQueryMeta
>;

export function baseQueryWithValidation(baseQuery: BaseQuery): BaseQuery {
  return async (args, api, extraOptions) => {
    extraOptions?.argumentSchema?.parse(args);

    const returnValue = await baseQuery(args, api, extraOptions);

    if (returnValue.meta?.response?.ok) {
      extraOptions?.dataSchema?.parse(returnValue.data);
    }

    return returnValue;
  };
}
