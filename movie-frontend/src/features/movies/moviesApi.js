import { api } from '../api/apiSlice';

export const moviesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listMovies: builder.query({
      query: (params) => ({ url: '/movies', params }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map((m) => ({ type: 'Movie', id: m._id })), { type: 'Movie', id: 'LIST' }]
          : [{ type: 'Movie', id: 'LIST' }],
    }),
    getMovie: builder.query({
      query: (id) => ({ url: `/movies/${id}` }),
      providesTags: (_r, _e, id) => [{ type: 'Movie', id }],
    }),
    getMovieWithReviews: builder.query({
      query: ({ id, page = 1, limit = 10 }) => ({ url: `/movies/${id}/with-reviews`, params: { page, limit } }),
      providesTags: (_r, _e, { id }) => [{ type: 'Movie', id }, { type: 'Review', id }],
    }),
    createMovie: builder.mutation({
      query: (body) => ({ url: '/movies', method: 'POST', body }),
      invalidatesTags: [{ type: 'Movie', id: 'LIST' }],
    }),
  }),
});

export const { useListMoviesQuery, useGetMovieQuery, useGetMovieWithReviewsQuery, useCreateMovieMutation } = moviesApi;
