type UserType = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
};

type ReviewType = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: UserType;
};

type ReviewDataType = {
  id: number;
  rating: number;
  comment: string;
};

type ReviewsType = ReviewType[];

export type { ReviewsType, ReviewType, ReviewDataType };
