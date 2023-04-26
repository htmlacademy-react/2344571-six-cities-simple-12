import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatchType, StateType} from '../types/state.js';
import {OffersType, OfferType} from '../types/offers';
import {AuthDataType, UserType} from '../types/user';
import {ReviewsType, ReviewDataType} from '../types/reviews';
import {
  loadOffers,
  setDataLoadedStatus,
  loadActiveOffer,
  setOfferLoadedStatus,
  loadReviews,
  loadNeighbourhood,
  requireAuthorization,
  setUser,
  loadFavorites,
  changeFavoriteStatus, // eslint-disable-line
  redirectToRoute,
} from './action';
import {saveToken, dropToken} from '../services/token';
import { AuthorizationStatus, AppRoute} from '../constants';

enum APIRoute {
  Offers = '/hotels',
  Reviews = '/comments',
  Login = '/login',
  Logout = '/logout',
  Nearby = '/nearby',
}

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OffersType>(APIRoute.Offers);
    dispatch(setDataLoadedStatus(true));
    dispatch(loadOffers(data));
    dispatch(setDataLoadedStatus(false));
  },
);

export const fetchActiveOfferAction = createAsyncThunk<void, number, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'data/fetchActiveOffer',
  async (offerID, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferType>(`${APIRoute.Offers}/${offerID}`);
    dispatch(setOfferLoadedStatus(true));
    dispatch(loadActiveOffer(data));
    dispatch(setOfferLoadedStatus(false));
  },
);

export const fetchReviewsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (offerID, {dispatch, extra: api}) => {
    const {data} = await api.get<ReviewsType>(`${APIRoute.Reviews}/${offerID}`);
    dispatch(loadReviews(data));
  }
);

export const postReviewAction = createAsyncThunk<void, ReviewDataType, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'data/postReview',
  async ({id, rating, comment}, {dispatch, extra: api}) => {
    const {data} = await api.post<ReviewsType>(`${APIRoute.Reviews}/${id}`, {comment, rating});
    dispatch(loadReviews(data));
  },
);

export const fetchNeighbourhoodAction = createAsyncThunk<void, number, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'data/fetchNeighbourhood',
  async (offerID, {dispatch, extra: api}) => {
    const {data} = await api.get<OffersType>(`${APIRoute.Offers}/${offerID}${APIRoute.Nearby}`);
    dispatch(loadNeighbourhood(data));
  }
);

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OffersType>(APIRoute.Offers);
    dispatch(setDataLoadedStatus(true));
    dispatch(loadFavorites(data));
    dispatch(setDataLoadedStatus(false));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get(APIRoute.Login);
      dispatch(setUser(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthDataType, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserType>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(setUser(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setUser(null));
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
