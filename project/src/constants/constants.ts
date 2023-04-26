export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const COUNT_NEAR_OFFER = 3;

export enum SortingTypes {
  PriceLowToHigh = 'PRICE_LOW_TO_HIGH',
  PriceHighToLow = 'PRICE_HIGH_TO_LOW',
  TopRatedFirst = 'TOP_RATED_FIRST',
  Popular = 'POPULAR',
}

export enum NameSpace {
  User = 'USER',
  Offer = 'OFFER',
  Comment = 'COMMENT',
  NearOffers = 'NEAR_OFFERS'
}

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}
