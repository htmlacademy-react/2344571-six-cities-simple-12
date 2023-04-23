import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  setSortType,
  loadOffers,
  loadReviews,
  requireAuthorization,
  setDataLoadedStatus,
} from './action';
import { Cities, SortOption, AuthorizationStatus } from '../constants';
import { OffersType } from '../types/offers';
import { ReviewsType } from '../types/reviews';
import { UserType } from '../types/user';
import { user } from '../mocks/user';

type initialStateType = {
  activeCity: string;
  activeSortType: string;
  offers: OffersType;
  authorizationStatus: string;
  isDataLoaded: boolean;
  reviews: ReviewsType;
  user: UserType;
};

const initialState: initialStateType = {
  activeCity: Cities[0],
  activeSortType: SortOption.Popular,
  offers: [],
  reviews: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  user,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload.city;
    })
    .addCase(setSortType, (state, action) => {
      state.activeSortType = action.payload.option;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export { reducer };
