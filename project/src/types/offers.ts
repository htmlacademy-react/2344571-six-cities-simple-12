import { User } from './user';
import { Location } from './location';

export type City = {
  location: Location;
  name: string;
};

export type Offers = {
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: User;
  id: number;
  images: string[];
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};

export const CityLocation: City = {
  location: {
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
  name: 'Amsterdam',
};
