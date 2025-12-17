import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus } from '@consts/consts';
import type { User } from '@types';
import type { UserProcessState } from '@types';

const initialState: UserProcessState = {
  authorizationStatus: AuthStatus.UNKNOWN,
  user: null,
};

export const userProcessSlice = createSlice({
  name: 'userProcess',
  initialState,
  reducers: {
    requireAuthorization(state, action: PayloadAction<AuthStatus>) {
      state.authorizationStatus = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
});

export const { requireAuthorization, setUser } = userProcessSlice.actions;
