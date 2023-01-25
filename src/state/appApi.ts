import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SearchTypeParams, SearchResults } from '@/types';

type SearchQueryParams = SearchTypeParams & {
  term?: string;
  limit: number;
};

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    search: builder.query<SearchResults, SearchQueryParams>({
      query: (params) => {
        return {
          url: 'search/',
          params: {
            ...params,
            media: 'music',
          },
        };
      },
    }),
  }),
});

export const { useSearchQuery } = appApi;
