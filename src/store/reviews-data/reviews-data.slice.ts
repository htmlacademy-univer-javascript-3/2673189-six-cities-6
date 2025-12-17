import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Review, ReviewsDataState } from '@types';

const initialState: ReviewsDataState = {
  reviews: [],
  isReviewsLoading: false,
  isReviewPosting: false,
};

export const reviewsDataSlice = createSlice({
  name: 'reviewsData',
  initialState,
  reducers: {
    setReviews(state, action: PayloadAction<Review[]>) {
      state.reviews = action.payload;
    },
    clearReviews(state) {
      state.reviews = [];
    },
    setReviewsLoadingStatus(state, action: PayloadAction<boolean>) {
      state.isReviewsLoading = action.payload;
    },
    setReviewPostingStatus(state, action: PayloadAction<boolean>) {
      state.isReviewPosting = action.payload;
    },
  },
});

export const {
  setReviews,
  clearReviews,
  setReviewsLoadingStatus,
  setReviewPostingStatus,
} = reviewsDataSlice.actions;
