import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {APIRoute, AppRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR} from '../const';
import { getUserData, loadOffer, loadOffers, loadOffersNearby, loadReviews, redirectToRoute, setAuthorizationStatus, setError, setOfferLoading, setRoomsLoadingStatus } from './action';
import { Offers, Reviews, OfferId, Offer, NewReview } from '../types/offer';
import { dropToken, saveToken } from '../services/token';
import { UserData } from '../types/user-data';
import { AuthData } from '../types/auth-data';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    try {
      dispatch(setRoomsLoadingStatus(true));
      const { data } = await api.get<Offers>(APIRoute.Hotels);
      dispatch(setRoomsLoadingStatus(false));
      dispatch(loadOffers(data));
    } catch (error) {
      dispatch(setRoomsLoadingStatus(false));
    }
  }
);

export const fetchOfferAction = createAsyncThunk<void, OfferId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (offerId, { dispatch, extra: api }) => {
    if (!offerId) {
      dispatch(redirectToRoute(AppRoute.Main));
    }
    try {
      dispatch(setOfferLoading(true));
      const { data } = await api.get<Offer>(`${APIRoute.Hotels}/${offerId}`);
      dispatch(loadOffer(data));
      dispatch(setOfferLoading(false));
    } catch (error) {
      dispatch(setOfferLoading(false));
    }
  }
);

export const fetchOffersNearbyAction = createAsyncThunk<void, OfferId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffersNearby',
  async (offerId, {dispatch, extra: api}) => {
    const { data } = await api.get<Offers>(`${APIRoute.Hotels}/${offerId}${APIRoute.Nearby}`);
    dispatch(loadOffersNearby(data));
  }
);

export const fetchReviewAction = createAsyncThunk<void, OfferId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (offerId, {dispatch, extra: api}) => {
    const { data } = await api.get<Reviews>(`${APIRoute.Reviews}/${offerId}`);
    dispatch(loadReviews(data));
  }
);

export const addReviewAction = createAsyncThunk<void, NewReview, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/setNewReview',
  async ({offerId, comment, rating}, {dispatch, extra: api}) => {
    const {data} = await api.post<Reviews>(`${APIRoute.Reviews}/${offerId}`, {comment, rating});
    dispatch(loadReviews(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(getUserData(data));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
    dispatch(getUserData(data));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  },
);

export const clearErrorAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
}>(
  'offers/clearError',
  (_arg, {dispatch}) => {
    setTimeout(
      () => dispatch(setError(null)) && dispatch(setRoomsLoadingStatus(false)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
