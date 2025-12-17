import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppDataState } from '@types';

const initialState: AppDataState = {
  error: null,
};

export const appDataSlice = createSlice({
  name: 'appData',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setError } = appDataSlice.actions;
