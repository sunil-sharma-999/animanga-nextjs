import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const animangaApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
  keepUnusedDataFor: 3600,
  endpoints: (builder) => ({
    getTop: builder.query({
      query: ({ type = 'manga', page = 1, q = '' }) =>
        q
          ? `${type}?letter=${q.trim()}&page=${page}&order_by=members&sort=desc`
          : `top/${type}?page=${page}`,
    }),
    getSingleItem: builder.query({
      query: ({ type, id }) => `${type}/${id}`,
    }),
    getRecom: builder.query({
      query: ({ type, id }) => `${type}/${id}/recommendations`,
    }),
  }),
});

export const { useGetTopQuery, useGetSingleItemQuery, useGetRecomQuery } =
  animangaApi;
