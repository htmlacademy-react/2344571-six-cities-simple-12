import {store} from '../store';
import { clearErrorAction } from '../store/offer-process/api-actions';
import { setError } from '../store/offer-process/offer-process';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};
