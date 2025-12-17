import { createSelector } from '@reduxjs/toolkit';
import type { AppProcessState, State } from '@types';
import { NameSpace } from '@consts/consts';

export const selectAppProcessState = (state: State): AppProcessState => state[NameSpace.AppProcess];

export const selectCity = createSelector(
  [selectAppProcessState],
  (appProcess) => appProcess.city
);

export const selectSortType = createSelector(
  [selectAppProcessState],
  (appProcess) => appProcess.sortType
);
