import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../services/constants';
import { loadOfferById, loadOffers, setError, setIsOffersDataLoading } from './offer-process';
import { Offers } from '../../types/offers';
import { OfferId } from '../../types/review';
import { TIMEOUT_SHOW_ERROR } from '../../services/constants';
import { store } from '..';

export const clearErrorAction = createAsyncThunk(
  'data/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOfferAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setIsOffersDataLoading(true));
    const { data } = await api.get<Offers[]>(APIRoute.Offers);
    dispatch(setIsOffersDataLoading(false));
    dispatch(loadOffers(data));
  },
);

export const fetchOfferByIdAction = createAsyncThunk<void, OfferId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferById',
  async ({ id }, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(`${APIRoute.Offers}/${id}`);
    dispatch(loadOfferById(data));
  },
);
