import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortType } from '@consts/consts';
import type { AppProcessState } from '@types';

const initialState: AppProcessState = {
  city: 'Paris',
  sortType: SortType.Popular,
};

export const appProcessSlice = createSlice({
  name: 'appProcess',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    setSortType(state, action: PayloadAction<SortType>) {
      state.sortType = action.payload;
    },
  },
});

export const { changeCity, setSortType } = appProcessSlice.actions;
