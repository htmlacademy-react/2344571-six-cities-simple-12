import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history/browser-history';
import { rootReducer } from '../root-reducer/root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) => (next) => (action: PayloadAction<string>) => {
    if (action.type === 'data/redirectToRoute') {
      browserHistory.push(action.payload);
    }

    return next(action);
  };

