import { createSelector } from '@reduxjs/toolkit';
import type { State, UserProcessState } from '@types';
import { NameSpace } from '@consts/consts';

export const selectUserProcessState = (state: State): UserProcessState => state[NameSpace.User];

export const selectAuthorizationStatus = createSelector(
  [selectUserProcessState],
  (userProcess) => userProcess.authorizationStatus
);

export const selectUser = createSelector(
  [selectUserProcessState],
  (userProcess) => userProcess.user
);
