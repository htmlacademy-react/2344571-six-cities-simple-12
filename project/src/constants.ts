export const Cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export enum SortOption {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum AppRoute {
  Root = '/',
  Offer = '/offer/:id',
  Login = '/login',
  NotFound = '*',
}

export enum Type {
  apartment = 'Apartment',
  room = 'Private Room',
  house = 'House',
  hotel = 'Hotel',
}
