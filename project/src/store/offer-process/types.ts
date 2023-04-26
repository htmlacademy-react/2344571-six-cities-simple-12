import { SortingTypes } from '../../constants/enum';
import { Offers } from '../../types/offers';

export type OfferProcess = {
  offers: Offers[];
  isOffersDataLoading: boolean;
  id: number | null;
  error: string | null;
  offer: Offers | null;
  sortName: SortingTypes;
  city: string;
};
