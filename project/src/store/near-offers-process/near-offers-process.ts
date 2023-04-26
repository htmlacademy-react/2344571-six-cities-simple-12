import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants/constants';
import { Offers } from '../../types/offers';
import { NearOffersProcess } from './types';

export const initialState: NearOffersProcess = {
  nearOffers: [],
};

export const nearOffersProcessSlice = createSlice({
  name: NameSpace.NearOffers,
  initialState,
  reducers: {
    setNearOffers: (state, action: PayloadAction<Offers[]>) => {
      state.nearOffers = action.payload;
    },
  },
});

export const { setNearOffers } = nearOffersProcessSlice.actions;
