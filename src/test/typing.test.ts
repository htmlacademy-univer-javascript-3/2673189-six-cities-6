import { describe, expect, it } from 'vitest';
import { makeOffer, makeReview, makeUser } from './mock';

describe('Test factories typing', () => {
  it('Should create correctly typed entities', () => {
    const offer = makeOffer();
    const review = makeReview();
    const user = makeUser();

    expect(offer.id).toBeTypeOf('string');
    expect(review.id).toBeTypeOf('string');
    expect(user.email).toBeTypeOf('string');
  });
});
