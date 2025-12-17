import { describe, expect, it } from 'vitest';
import { offersDataSlice, setOffers, setOffersDataLoadingStatus } from './offers-data.slice';
import { makeOffer } from '@test/mock';
import type { Offer } from '@types';

describe('offersDataSlice reducer', () => {
  it('Should return initial state when unknown action', () => {
    const result = offersDataSlice.reducer(undefined, { type: 'UNKNOWN' });
    expect(result).toEqual({ offers: [], isOffersDataLoading: false });
  });

  it('Should set offers array', () => {
    const offers: Offer[] = [makeOffer({ id: '1' }), makeOffer({ id: '2' })];
    const result = offersDataSlice.reducer(undefined, setOffers(offers));
    expect(result.offers).toEqual(offers);
  });

  it('Should set offers loading flag', () => {
    const result = offersDataSlice.reducer(undefined, setOffersDataLoadingStatus(true));
    expect(result.isOffersDataLoading).toBe(true);
  });
});
