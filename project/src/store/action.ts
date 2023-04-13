import { createAction } from '@reduxjs/toolkit';

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
