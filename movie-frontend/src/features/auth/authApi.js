import { api } from '../api/apiSlice';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({ url: '/auth/register', method: 'POST', body }),
    }),
    login: builder.mutation({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
    }),
    me: builder.query({ query: () => ({ url: '/auth/me' }) }),
    refresh: builder.mutation({
      query: (body) => ({ url: '/auth/refresh', method: 'POST', body }),
    }),
    logout: builder.mutation({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useMeQuery, useRefreshMutation, useLogoutMutation } = authApi;
