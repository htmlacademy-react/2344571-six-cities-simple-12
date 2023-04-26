import { commentProcessSlice } from '../comments-process/comment-process';
import { nearOffersProcessSlice } from '../near-offers-process/near-offers-process';
import { offerProcessSlice } from '../offer-process/offer-process';
import { userProcessSlice } from '../user-process/user-process';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  [commentProcessSlice.name]: commentProcessSlice.reducer,
  [offerProcessSlice.name]: offerProcessSlice.reducer,
  [userProcessSlice.name]: userProcessSlice.reducer,
  [nearOffersProcessSlice.name]: nearOffersProcessSlice.reducer,
});
