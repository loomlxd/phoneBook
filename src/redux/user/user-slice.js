import { createSlice } from '@reduxjs/toolkit';
import {
  getUserAfterRegister,
  getUserAfterLogin,
  logOutCurrentUser,
  refreshUser,
} from './user-actions';

const initialState = {
  name: '',
  email: '',
  error: null,
  isLoggedIn: false,
  isRefreshingUser: false,
};

const userSlicer = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getUserAfterRegister.fulfilled, (state, { payload }) => {
        state.name = payload.name;
        state.isLoggedIn = true;
      })
      .addCase(getUserAfterRegister.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(getUserAfterLogin.fulfilled, (state, { payload }) => {
        state.email = payload.user.email;
        state.name = payload.name;
        state.isLoggedIn = true;
      })
      .addCase(getUserAfterLogin.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(logOutCurrentUser.fulfilled, (state, _) => {
        state.name = '';
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logOutCurrentUser.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshingUser = true;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.name = payload.user_metadata.name;
        state.email = payload.user_metadata.email;
        state.isLoggedIn = true;
        state.isRefreshingUser = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshingUser = false;
      });
  },
  reducers: {
    wipeError(state) {
      state.error = null;
    },
  },
});

export const userActions = userSlicer.actions;
export const userReducer = userSlicer.reducer;
