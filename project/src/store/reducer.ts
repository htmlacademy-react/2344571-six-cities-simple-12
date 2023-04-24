import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  setSortType,
  getOffers,
  getReviews,
  requireAuthorization,
  setDataLoadedStatus,
  getUser,
} from './action';
import { Cities, SortOption, AuthorizationStatus } from '../constants';
import { OffersType } from '../types/offers';
import { ReviewsType } from '../types/reviews';
import { UserType } from '../types/user';

type initialStateType = {
  activeCity: string;
  activeSortType: string;
  offers: OffersType;
  authorizationStatus: string;
  isDataLoaded: boolean;
  reviews: ReviewsType;
  user: UserType | null;
};

const initialState: initialStateType = {
  activeCity: Cities[0],
  activeSortType: SortOption.Popular,
  offers: [],
  reviews: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  user:null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(setSortType, (state, action) => {
      state.activeSortType = action.payload.option;
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(getReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(getUser, (state, action) => {
      state.user = action.payload;
    });
});

export { reducer };
