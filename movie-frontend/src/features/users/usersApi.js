import { api } from '../api/apiSlice';

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (id) => ({ url: `/users/${id}` }),
      providesTags: (_r, _e, id) => [{ type: 'User', id }],
    }),
    updateProfile: builder.mutation({
      query: ({ id, body }) => ({ url: `/users/${id}`, method: 'PUT', body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'User', id }],
    }),
    getWatchlist: builder.query({
      query: ({ id, page = 1, limit = 20 }) => ({ url: `/users/${id}/watchlist`, params: { page, limit } }),
      providesTags: (_r, _e, { id }) => [{ type: 'Watchlist', id }],
    }),
    addWatchlist: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/users/${id}/watchlist`, method: 'POST', body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Watchlist', id }],
    }),
    removeWatchlist: builder.mutation({
      query: ({ id, movieId }) => ({ url: `/users/${id}/watchlist/${movieId}`, method: 'DELETE' }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Watchlist', id }],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation, useGetWatchlistQuery, useAddWatchlistMutation, useRemoveWatchlistMutation } = usersApi;
