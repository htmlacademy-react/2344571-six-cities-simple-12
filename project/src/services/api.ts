import { AppRoute } from './../const';
import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import { getToken } from './token';
import { processErrorHandle } from './process-error-handle';
import { redirect } from 'react-router-dom';

const BACKEND_URL = 'https://12.react.pages.academy/six-cities-simple';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });
  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );
  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {
      if (error.response?.status === 401) {
        processErrorHandle(error.response.data.error);
      } else if (error.response?.status === 404) {
        redirect(AppRoute.Empty);
      }
      throw error;
    }
  );
  return api;
};
