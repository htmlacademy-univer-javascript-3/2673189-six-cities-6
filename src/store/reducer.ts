import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '@consts/consts';
import { appProcessSlice } from './app-process/app-process.slice';
import { userProcessSlice } from './user-process/user-process.slice';
import { offersDataSlice } from './offers-data/offers-data.slice';
import { offerDataSlice } from './offer-data/offer-data.slice';
import { reviewsDataSlice } from './reviews-data/reviews-data.slice';
import { appDataSlice } from './app-data/app-data.slice';

export const rootReducer = combineReducers({
  [NameSpace.App]: appDataSlice.reducer,
  [NameSpace.AppProcess]: appProcessSlice.reducer,
  [NameSpace.User]: userProcessSlice.reducer,
  [NameSpace.Offers]: offersDataSlice.reducer,
  [NameSpace.Offer]: offerDataSlice.reducer,
  [NameSpace.Reviews]: reviewsDataSlice.reducer,
});
