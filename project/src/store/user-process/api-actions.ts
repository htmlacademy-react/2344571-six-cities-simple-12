import { APIRoute } from '../../services/enum';
import { toast } from 'react-toastify';
import { AuthData } from '../../types/auth-data';
import { dropToken, saveToken } from '../../services/token';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types/state';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserData } from './types';
import { setUserData } from './user-process';
import { AppRoute } from '../../router/RoutePath';

export const redirectToRoute = createAction(
  'app/redirectToRoute',
  (route: AppRoute) => ({ payload: route })
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    dispatch(setUserData(data));
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
      if (data) {
        saveToken(data.token);
      }
      dispatch(setUserData(data));
      dispatch(redirectToRoute(AppRoute.Root));
    } catch (e) {
      toast.error('Failed to authorization');
      throw e;
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(setUserData(null));
    } catch (e) {
      toast.error('Failed to logout');
      throw e;
    }
  },
);
