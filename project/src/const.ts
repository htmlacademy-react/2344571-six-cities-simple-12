import { City, Locations, Offers } from './types/offer';

export const MAX_OFFERS_NEARBY = 3;

export const TIMEOUT_SHOW_ERROR = 2000;

export const LOCATIONS: Locations = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },{
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },{
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },{
    name: 'Amsterdam',
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 13
    }
  },{
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },{
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  }
];

export const CITY: City = {
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13
  }
};

export enum AppRoute {
  Main = '/',
  Login = 'login',
  Room = '/offer',
  Empty = 'empty',
  Rooms = 'offers'
}

export enum APIRoute {
  Hotels = '/hotels',
  Reviews = '/comments',
  Login = '/login',
  Logout = '/logout',
  Nearby = '/nearby'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Cities {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export enum SortMenuItems {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  Top = 'Top rated first',
}

export enum NameSpace {
  User = 'USER',
  Offer = 'OFFER',
  Comment = 'COMMENT',
  NearOffers = 'NEAR_OFFERS',
}

export function sortOffers(cards: Offers, sortListItem: string) {
  if(sortListItem === SortMenuItems.LowToHigh) {
    return cards.sort((a, b) => a.price - b.price);
  } else if (sortListItem === SortMenuItems.HighToLow) {
    return cards.sort((a, b) => b.price - a.price);
  } else if(sortListItem === SortMenuItems.Top) {
    return cards.sort((a, b) => b.rating - a.rating);
  } else {
    return cards;
  }
}

export const URL_POINT_DEFAULT = './img/pin.svg';

export const URL_POINT_ACTIVE = './img/pin-active.svg';
