import { createSlice } from '@reduxjs/toolkit';

const initialState = { user: null, accessToken: null, refreshToken: null };

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    updateUser: (state, action) => {
      if (state.user) state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { setCredentials, logout, updateUser } = slice.actions;
export default slice.reducer;
