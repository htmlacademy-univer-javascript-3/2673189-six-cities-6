import { describe, expect, it } from 'vitest';
import { offerDataSlice, setNearbyOffers, setOfferById } from './offer-data.slice';
import { makeOffer } from '@test/mock';
import type { Offer } from '@types';

describe('offerDataSlice reducer', () => {
  it('Should return initial state when unknown action', () => {
    const result = offerDataSlice.reducer(undefined, { type: 'UNKNOWN' });
    expect(result).toEqual({ offerById: null, nearbyOffers: [] });
  });

  it('Should set offerById', () => {
    const offer: Offer = makeOffer({ id: '10' });
    const result = offerDataSlice.reducer(undefined, setOfferById(offer));
    expect(result.offerById).toEqual(offer);
  });

  it('Should clear offerById', () => {
    const offer: Offer = makeOffer({ id: '10' });
    const result = offerDataSlice.reducer({ offerById: offer, nearbyOffers: [] }, setOfferById(null));
    expect(result.offerById).toBeNull();
  });

  it('Should set nearby offers', () => {
    const offers: Offer[] = [makeOffer({ id: '1' }), makeOffer({ id: '2' })];
    const result = offerDataSlice.reducer(undefined, setNearbyOffers(offers));
    expect(result.nearbyOffers).toEqual(offers);
  });
});
