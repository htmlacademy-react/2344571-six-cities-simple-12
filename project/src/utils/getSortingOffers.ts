import { SortingTypes } from '../constants/enum';
import { Offers } from '../types/offers';

export const getSortingOffers = (offers: Offers[], activeSort: string) => {
  const sortingOffers = offers.slice();

  switch (activeSort) {
    case SortingTypes.PriceLowToHigh: return sortingOffers.sort((a: Offers, b: Offers) => a.price - b.price);
    case SortingTypes.PriceHighToLow: return sortingOffers.sort((a: Offers, b: Offers) => b.price - a.price);
    case SortingTypes.TopRatedFirst: return sortingOffers.sort((a: Offers, b: Offers) => b.rating - a.rating);
    default:
      return sortingOffers;
  }
};
