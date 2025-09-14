import { api } from '../api/apiSlice';

export const reviewsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listReviews: builder.query({
      query: ({ movieId, page = 1, limit = 10 }) => ({ url: `/movies/${movieId}/reviews`, params: { page, limit } }),
      providesTags: (_r, _e, { movieId }) => [{ type: 'Review', id: movieId }],
    }),
    upsertReview: builder.mutation({
      query: ({ movieId, ...body }) => ({ url: `/movies/${movieId}/reviews`, method: 'POST', body }),
      invalidatesTags: (_r, _e, { movieId }) => [{ type: 'Review', id: movieId }, { type: 'Movie', id: movieId }],
    }),
  }),
});

export const { useListReviewsQuery, useUpsertReviewMutation } = reviewsApi;
