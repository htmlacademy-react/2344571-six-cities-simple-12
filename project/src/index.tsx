import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/index';
import { Provider } from 'react-redux';
import { store } from './store';
import ErrorMessage from './components/error-message';
import { ToastContainer } from 'react-toastify';
import { checkAuthAction } from './store/user-process/api-actions';
import { fetchOfferAction } from './store/offer-process/api-actions';

store.dispatch(fetchOfferAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <ToastContainer />
      <App />
    </Provider >
  </StrictMode>
);
