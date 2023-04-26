import { User } from './user';

export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: User;
};

export type ReviewComment = {
  hotelId: number;
  comment: string;
  rating: number;
};

export type OfferId = {
  id: number;
}
