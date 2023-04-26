import { createReducer } from '@reduxjs/toolkit';
import {
  changeActiveCity,
  setActiveSortType,
  loadOffers,
  setDataLoadedStatus,
  loadActiveOffer,
  setOfferLoadedStatus,
  loadReviews,
  loadNeighbourhood,
  requireAuthorization,
  setUser,
  loadFavorites,
} from './action';
import { Cities, SortOption, AuthorizationStatus } from '../constants';
import { OffersType, OfferType } from '../types/offers';
import { ReviewsType } from '../types/reviews';
import { UserType } from '../types/user';

type initialStateType = {
  activeCity: string;
  activeSortType: string;
  offers: OffersType;
  isDataLoaded: boolean;
  activeOffer: OfferType | null;
  isOfferLoaded: boolean;
  reviews: ReviewsType;
  neighbourhood: OffersType;
  authorizationStatus: string;
  user: UserType | null;
  favorites: OffersType;
};

const initialState: initialStateType = {
  activeCity: Cities[0],
  activeSortType: SortOption.Popular,
  offers: [],
  isDataLoaded: false,
  activeOffer: null,
  isOfferLoaded: false,
  reviews: [],
  neighbourhood: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  favorites: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(setActiveSortType, (state, action) => {
      state.activeSortType = action.payload.option;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(loadActiveOffer, (state, action) => {
      state.activeOffer = action.payload;
    })
    .addCase(setOfferLoadedStatus, (state, action) => {
      state.isOfferLoaded = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loadNeighbourhood, (state, action) => {
      state.neighbourhood = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(loadFavorites, (state, action) => {
      state.favorites = action.payload;
    });
});

export { reducer };
