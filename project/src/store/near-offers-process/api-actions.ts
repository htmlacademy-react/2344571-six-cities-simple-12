import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../services/constants';
import { Offers } from '../../types/offers';
import { setNearOffers } from './near-offers-process';

export const fetchNearOffersAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearOffers',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    dispatch(setNearOffers(data));
  },
);
