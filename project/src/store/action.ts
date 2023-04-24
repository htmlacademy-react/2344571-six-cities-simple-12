import { createAction } from '@reduxjs/toolkit';
import { OffersType } from '../types/offers';
import { ReviewsType } from '../types/reviews';
import { AuthorizationStatus } from '../constants';
import { UserType } from '../types/user';

enum AppRoute {
  Root = '/',
  Offer = '/offer/:id',
  Login = '/login',
  NotFound = '*',
}

export const changeCity = createAction<string>('changeCity');

export const setSortType = createAction('setSortType', (option) => ({
  payload: option,
}));

export const getOffers = createAction<OffersType>('getOffers');

export const getReviews = createAction<ReviewsType>('getReviews');

export const getUser = createAction<UserType | null>('getUser');

export const requireAuthorization = createAction<AuthorizationStatus>(
  'requireAuthorization'
);

export const setDataLoadedStatus = createAction<boolean>('setDataLoadedStatus');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
