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

type ReviewsType = ReviewType[];

export type { ReviewsType, ReviewType };
