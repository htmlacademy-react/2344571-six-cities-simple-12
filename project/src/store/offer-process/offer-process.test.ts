import { CITIES } from '../../components/cities/constants';
import { SortingTypes } from '../../constants/enum';
import { makeFakeOffers } from '../../utils/mocks';
import { fetchOfferAction } from './api-actions';
import { offerProcessSlice } from './offer-process';
import { OfferProcess } from './types';

describe('reducer: offerData', () => {
  let state: OfferProcess;

  beforeEach(() => {
    state = {
      offers: [],
      isOffersDataLoading: false,
      id: null,
      error: null,
      offer: null,
      sortName: SortingTypes.Popular,
      city: CITIES[0],
    };
  });

  it('Should return initial state', () => { expect(offerProcessSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(state); });

  it('isOffersDataLoading', () => {
    const reducer = offerProcessSlice.reducer(state, {
      type: fetchOfferAction,
      payload: makeFakeOffers()
    });
    expect(reducer).toEqual({ ...state, isOffersDataLoading: false });
  });
});
