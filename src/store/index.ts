import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducer.ts';
import { createAPI } from '../services/api';
import { requireAuthorization } from '@store/user-process/user-process.slice';
import { AuthStatus } from '@consts/consts';

const unauthorizedHandlerRef: { current?: () => void } = {};

export const api = createAPI(() => unauthorizedHandlerRef.current?.());

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

unauthorizedHandlerRef.current = () => {
  store.dispatch(requireAuthorization(AuthStatus.NOAUTH));
};
