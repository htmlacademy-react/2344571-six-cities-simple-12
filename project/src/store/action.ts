import { createAction } from '@reduxjs/toolkit';
import { OffersType } from '../types/offers';
import { ReviewsType } from '../types/reviews';
import { AuthorizationStatus } from '../constants';

export const changeCity = createAction('changeCity', (city) => ({
  payload: city,
}));

export const setSortType = createAction(
  'setSortType',
  (option) => ({
    payload: option,
  })
);

export const getOffers = createAction('getOffers', (offers) => ({
  payload: offers,
}));

export const getReviews = createAction('getReviews', (reviews) => ({
  payload: reviews
}));

export const getUser = createAction('getUser', (user) => ({
  payload: user
}));

export const loadOffers = createAction<OffersType>('loadOffers');

export const requireAuthorization = createAction<AuthorizationStatus>(
  'requireAuthorization'
);

export const setDataLoadedStatus = createAction<boolean>('setDataLoadedStatus');

export const loadReviews = createAction<ReviewsType>('loadReviews');
