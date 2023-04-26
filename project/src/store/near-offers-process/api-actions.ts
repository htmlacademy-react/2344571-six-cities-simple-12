import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../services/enum';
import { Offers } from '../../types/offers';
import { setNearOffers } from './near-offers-process';
import { toast } from 'react-toastify';

export const fetchNearOffersAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearOffers',
  async (offerId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Offers[]>(`${APIRoute.Offers}/${offerId}/nearby`);
      dispatch(setNearOffers(data));
    } catch (e) {
      toast.error('Unfortunately, we can\'t show nearby offers');
      throw e;
    }
  },
);
