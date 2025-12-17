import { describe, expect, it } from 'vitest';
import {
  clearReviews,
  reviewsDataSlice,
  setReviewPostingStatus,
  setReviews,
  setReviewsLoadingStatus,
} from './reviews-data.slice';
import { makeReview } from '@test/mock';
import type { Review } from '@types';

describe('reviewsDataSlice reducer', () => {
  it('Should return initial state when unknown action', () => {
    const result = reviewsDataSlice.reducer(undefined, { type: 'UNKNOWN' });
    expect(result).toEqual({
      reviews: [],
      isReviewsLoading: false,
      isReviewPosting: false,
    });
  });

  it('Should set reviews', () => {
    const reviews: Review[] = [makeReview({ id: '1' }), makeReview({ id: '2' })];
    const result = reviewsDataSlice.reducer(undefined, setReviews(reviews));
    expect(result.reviews).toEqual(reviews);
  });

  it('Should clear reviews', () => {
    const reviews: Review[] = [makeReview({ id: '1' })];
    const result = reviewsDataSlice.reducer(
      { reviews, isReviewsLoading: false, isReviewPosting: false },
      clearReviews()
    );
    expect(result.reviews).toEqual([]);
  });

  it('Should set reviews loading flag', () => {
    const result = reviewsDataSlice.reducer(undefined, setReviewsLoadingStatus(true));
    expect(result.isReviewsLoading).toBe(true);
  });

  it('Should set review posting flag', () => {
    const result = reviewsDataSlice.reducer(undefined, setReviewPostingStatus(true));
    expect(result.isReviewPosting).toBe(true);
  });
});
