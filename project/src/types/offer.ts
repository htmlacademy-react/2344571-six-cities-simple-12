export type Offer = {
  city: City;
  previewImage: string;
  images: string[];
  title: string;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: User;
  description: string;
  location: Location;
  id: OfferId;
};

export type OfferId = number;

export type City = {
  name: string;
  location: Location;
};

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type Locations = City[];

export type User = {
  id: number;
  name: string;
  isPro: boolean;
  avatarUrl: string;
};

export type Review = {
  comment: string;
  date: string;
  id: number;
  offerId: OfferId;
  rating: number;
  user: User;
};

export type NewReview = {
  offerId: OfferId;
  comment: string;
  rating: number;
};

export type Offers = Offer[];

export type Reviews = Review[];
