import { createAction } from '@reduxjs/toolkit';
import { OffersType, OfferType } from '../types/offers';
import { ReviewsType } from '../types/reviews';
import { AuthorizationStatus } from '../constants';
import { UserType } from '../types/user';

enum AppRoute {
  Root = '/',
  Offer = '/offer/:id',
  Login = '/login',
  NotFound = '*',
}

export const changeActiveCity = createAction<string>('changeActiveCity');

export const setActiveSortType = createAction(
  'setActiveSortType',
  (option) => ({
    payload: option,
  })
);

export const loadOffers = createAction<OffersType>('loadOffers');

export const setDataLoadedStatus = createAction<boolean>('setDataLoadedStatus');

export const loadActiveOffer = createAction<OfferType>('loadOffer');

export const setOfferLoadedStatus = createAction<boolean>(
  'setOfferLoadedStatus'
);

export const loadReviews = createAction<ReviewsType>('loadReviews');

export const loadNeighbourhood = createAction<OffersType>('loadNeighbourhood');

export const requireAuthorization = createAction<AuthorizationStatus>(
  'requireAuthorization'
);

export const setUser = createAction<UserType | null>('setUser');

export const loadFavorites = createAction<OffersType>('loadFavorites');

export const changeFavoriteStatus = createAction<boolean>(
  'changeFavoriteStatus'
);

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
