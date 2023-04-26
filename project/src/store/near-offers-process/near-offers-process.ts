import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants/enum';
import { Offers } from '../../types/offers';
import { NearOffersProcess } from './types';
import { fetchNearOffersAction } from './api-actions';

export const initialState: NearOffersProcess = {
  nearOffers: [],
  offersNearbyLoading: false,
};

export const nearOffersProcessSlice = createSlice({
  name: NameSpace.NearOffers,
  initialState,
  reducers: {
    setNearOffers: (state, action: PayloadAction<Offers[]>) => {
      state.nearOffers = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNearOffersAction.pending, (state) => {
        state.offersNearbyLoading = true;
      })
      .addCase(fetchNearOffersAction.fulfilled, (state) => {
        state.offersNearbyLoading = false;
      });
  }
});

export const { setNearOffers } = nearOffersProcessSlice.actions;
