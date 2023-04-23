type UserType = {
  avatarUrl: string;
  email: string;
  id: number;
  isPro: boolean;
  name: string;
  token: string;
};

type AuthDataType = {
  login: string;
  password: string;
};

type UserDataType = {
  id: number;
  email: string;
  token: string;
};

export type { UserType, AuthDataType, UserDataType };
