import { describe, expect, it } from 'vitest';
import { appDataSlice, setError } from './app-data.slice';

describe('appDataSlice reducer', () => {
  it('should return initial state when unknown action', () => {
    const result = appDataSlice.reducer(undefined, { type: 'UNKNOWN' });
    expect(result).toEqual({ error: null });
  });

  it('should set error', () => {
    const state = { error: null };
    const result = appDataSlice.reducer(state, setError('boom'));
    expect(result.error).toBe('boom');
  });

  it('should clear error', () => {
    const state = { error: 'boom' };
    const result = appDataSlice.reducer(state, setError(null));
    expect(result.error).toBeNull();
  });
});
