import { describe, expect, it } from 'vitest';
import { appProcessSlice, changeCity, setSortType } from './app-process.slice';
import { SortType } from '@consts/consts';

describe('appProcessSlice reducer', () => {
  it('Should return initial state when unknown action', () => {
    const result = appProcessSlice.reducer(undefined, { type: 'UNKNOWN' });
    expect(result).toEqual({ city: 'Paris', sortType: SortType.Popular });
  });

  it('Should change city', () => {
    const result = appProcessSlice.reducer(undefined, changeCity('Amsterdam'));
    expect(result.city).toBe('Amsterdam');
  });

  it('Should set sort type', () => {
    const result = appProcessSlice.reducer(undefined, setSortType(SortType.PriceHighToLow));
    expect(result.sortType).toBe(SortType.PriceHighToLow);
  });
});
