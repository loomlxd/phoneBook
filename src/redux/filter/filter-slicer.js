import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: { value: '' },
  reducers: {
    change(state, { payload }) {
      state.value = payload;
    },
  },
});
export const filterActions = filterSlice.actions;
export const filterReducers = filterSlice.reducer;
