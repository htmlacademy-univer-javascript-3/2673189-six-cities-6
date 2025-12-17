import { createSelector } from '@reduxjs/toolkit';
import type { AppDataState, State } from '@types';
import { NameSpace } from '@consts/consts';

export const selectAppDataState = (state: State): AppDataState => state[NameSpace.App];

export const selectError = createSelector(
  [selectAppDataState],
  (appData) => appData.error
);
