import { createReducer } from '@reduxjs/toolkit';
import { changeCity, getOffers, getReviews, getUser, setSortType} from './action';
import { Cities, SortOption } from '../constants';
import { offers } from '../mocks/offers';
import { reviews } from '../mocks/reviews';
import { users } from '../mocks/users';

const initialState = {
  activeCity: Cities[0],
  activeSortType: SortOption.Popular,
  offers: offers,
  reviews: reviews,
  user: users,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload.city;
    })
    .addCase(setSortType, (state, action) => {
      state.activeSortType = action.payload.option;
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload.offers;
    })
    .addCase(getReviews, (state, action) => {
      state.reviews = action.payload.reviews;
    })
    .addCase(getUser, (state, action) => {
      state.user = action.payload.user;
    });
});

export { reducer };
