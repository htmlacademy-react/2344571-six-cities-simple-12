import { AppRoute, AuthorizationStatus } from '../const';
import { UserData } from '../types/user-data';
import { City, Offer, Offers, Reviews } from './../types/offer';
import {createAction} from '@reduxjs/toolkit';

export const setActiveCity = createAction('offers/cityChange', (city: City) => ({
  payload: city
}));

export const changeOffersSort = createAction('offers/changeOffersSort', (sort: string) => ({
  payload: sort
}));

export const loadOffers = createAction<Offers>('offers/loadOffers');
export const loadOffersNearby = createAction<Offers>('offers/loadOffersNearby');
export const loadOffer = createAction<Offer>('offers/loadOffer');
export const setRoomsLoadingStatus = createAction<boolean>('offers/setRoomsLoadingStatus');
export const setError = createAction<string | null>('offers/setError');

export const loadReviews = createAction<Reviews>('reviews/loadReviews');

export const setOfferLoading = createAction<boolean>('offers/setOfferLoading');

export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthorizationStatus');
export const getUserData = createAction('user/loadUserData',(userData: UserData) => ({payload: userData}));
export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
