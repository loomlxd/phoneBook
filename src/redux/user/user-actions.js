import { createAsyncThunk } from '@reduxjs/toolkit';
import DbApi from '../../fetch-db-apis';

export const getUserAfterRegister = createAsyncThunk(
  'user/getUserAfterRegister',
  async (data, { rejectWithValue }) => {
    try {
      const user = await DbApi.registerUser(
        data.email,
        data.name,
        data.password,
      );
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getUserAfterLogin = createAsyncThunk(
  'user/getUserAfterLogin',
  async (data, { rejectWithValue }) => {
    try {
      const user = await DbApi.loginUser(data.email, data.password);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const logOutCurrentUser = createAsyncThunk(
  'user/logOutCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      DbApi.logOutUser();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const refreshUser = createAsyncThunk(
  'user/refreshUser',
  async (_, { rejectWithValue }) => {
    try {
      const user = await DbApi.refreshCurrentUser();
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
