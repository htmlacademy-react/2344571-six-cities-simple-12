import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Offers } from '../../types/offers';
import { OfferProcess } from './types';
import { CITIES } from '../../components/cities/constants';
import { NameSpace, SortingTypes } from '../../constants/enum';

const initialState: OfferProcess = {
  offers: [],
  isOffersDataLoading: false,
  id: null,
  error: null,
  offer: null,
  sortName: SortingTypes.Popular,
  city: CITIES[0],
};

export const offerProcessSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    loadOffers: (state, action: PayloadAction<Offers[]>) => {
      state.offers = action.payload;
    },
    setIsOffersDataLoading: (state, action: PayloadAction<boolean>) => {
      state.isOffersDataLoading = action.payload;
    },
    offerIdChange: (state, action: PayloadAction<number | null>) => {
      state.id = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    loadOfferById: (state, action: PayloadAction<Offers | null>) => {
      state.offer = action.payload;
    },
    changeSort: (state, action: PayloadAction<SortingTypes>) => {
      state.sortName = action.payload;
    },
    cityChange: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  },
});

export const { loadOffers, setIsOffersDataLoading, offerIdChange, setError, loadOfferById, changeSort, cityChange } = offerProcessSlice.actions;
