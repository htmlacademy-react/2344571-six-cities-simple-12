import { makeFakeNearOffers } from '../../utils/mocks';
import { nearOffersProcessSlice, setNearOffers } from './near-offers-process';
import { NearOffersProcess } from './types';

describe('Slice: nearOffer', () => {
  let state: NearOffersProcess;
  beforeEach(() => {
    state = {
      nearOffers: [],
      offersNearbyLoading: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(nearOffersProcessSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });
  it('nearOffers', () => {
    const fakeNearOffers = makeFakeNearOffers();
    const nearOfferReducer = nearOffersProcessSlice.reducer(state, {
      type: setNearOffers,
      payload: fakeNearOffers
    });

    expect(nearOfferReducer).toEqual({
      ...state,
      nearOffers: fakeNearOffers,
      offersNearbyLoading: false
    });
  });
});
