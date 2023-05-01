import { CITY } from '../const';
import {createReducer} from '@reduxjs/toolkit';
import { changeOffersSort, getUserData, loadOffer, loadOffers, loadOffersNearby, loadReviews, setActiveCity, setAuthorizationStatus, setError, setRoomsLoadingStatus } from './action';
import { AuthorizationStatus, SortMenuItems } from '../const';
import { City, NewReview, Offer, Offers, Reviews } from '../types/offer';
import { UserData } from '../types/user-data';

type initialStateType = {
  city: City;
  offers: Offers;
  offer: Offer | null;
  offersNearby: Offers;
  reviews:Reviews;
  sortOption: string;
  isRoomsLoading: boolean;
  error: string | null;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
  isReviewLoading: boolean;
  formData: NewReview | null;
  isOfferLoading: boolean;
}

const initialState: initialStateType = {
  city: CITY,
  offers: [],
  offer: null,
  offersNearby: [],
  reviews:[],
  sortOption: SortMenuItems.Popular,
  isRoomsLoading: false,
  error: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  formData: null,
  isReviewLoading: false,
  isOfferLoading: true,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeOffersSort, (state, action) => {
      state.sortOption = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(loadOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setRoomsLoadingStatus, (state, action) => {
      state.isRoomsLoading = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(getUserData, (state, action) => {
      state.userData = action.payload;
    });
});

export {reducer};
