import { createSelector } from '@reduxjs/toolkit';
import type { ReviewsDataState, State } from '@types';
import { NameSpace } from '@consts/consts';

export const selectReviewsDataState = (state: State): ReviewsDataState => state[NameSpace.Reviews];

export const selectReviews = createSelector(
  [selectReviewsDataState],
  (reviewsData) => reviewsData.reviews
);

export const selectIsReviewsLoading = createSelector(
  [selectReviewsDataState],
  (reviewsData) => reviewsData.isReviewsLoading
);

export const selectIsReviewPosting = createSelector(
  [selectReviewsDataState],
  (reviewsData) => reviewsData.isReviewPosting
);
