import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatchType, StateType } from '../types/state.js';
import { OffersType } from '../types/offers';
import { AuthDataType, UserDataType } from '../types/user';
import {
  loadOffers,
  requireAuthorization,
  setDataLoadedStatus,
} from './action';
import { saveToken, dropToken } from '../services/token';
import { AuthorizationStatus } from '../constants';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatchType;
    state: StateType;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<OffersType>('/hotels');
  dispatch(setDataLoadedStatus(true));
  dispatch(loadOffers(data));
  dispatch(setDataLoadedStatus(false));
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatchType;
    state: StateType;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.get('/login');
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthDataType,
  {
    dispatch: AppDispatchType;
    state: StateType;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token },
    } = await api.post<UserDataType>('/login', { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatchType;
    state: StateType;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete('/logout');
  dropToken();
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
});
