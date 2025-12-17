import { describe, expect, it } from 'vitest';
import { userProcessSlice, requireAuthorization, setUser } from './user-process.slice';
import { AuthStatus } from '@consts/consts';
import { makeUser } from '@test/mock';
import type { User } from '@types';

describe('userProcessSlice reducer', () => {
  it('Should return initial state when unknown action', () => {
    const result = userProcessSlice.reducer(undefined, { type: 'UNKNOWN' });
    expect(result).toEqual({ authorizationStatus: AuthStatus.UNKNOWN, user: null });
  });

  it('Should set authorization status', () => {
    const result = userProcessSlice.reducer(undefined, requireAuthorization(AuthStatus.AUTH));
    expect(result.authorizationStatus).toBe(AuthStatus.AUTH);
  });

  it('Should set user', () => {
    const user: User = makeUser({ email: 'x@y.z' });
    const result = userProcessSlice.reducer(undefined, setUser(user));
    expect(result.user).toEqual(user);
  });

  it('Should clear user', () => {
    const user: User = makeUser();
    const result = userProcessSlice.reducer(
      { authorizationStatus: AuthStatus.AUTH, user },
      setUser(null)
    );
    expect(result.user).toBeNull();
  });
});
