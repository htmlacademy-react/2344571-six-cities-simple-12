import { Routes, Route } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import Main from '../../pages/Main/Main';
import Room from '../../pages/Room/Room';
import PageNotFound from '../PageNotFound/PageNotFound';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Page from '../Page/Page';
import { AppRoute } from '../../constants';
import HistoryRouter from '../HistoryRoute/HistoryRoute';
import browserHistory from '../../browser-history';


function App(): JSX.Element {
  return (
    <HistoryRouter history={browserHistory}>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoute.Root} element={
          <Page>
            <Main />
          </Page>
        }
        />
        <Route path={AppRoute.Login} element={
          <Page>
            <Login />
          </Page>
        }
        />
        <Route path={AppRoute.Offer} element={
          <PrivateRoute>
            <Page>
              <Room />
            </Page>
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.NotFound} element={<PageNotFound />} />
      </Routes>
    </HistoryRouter >
  );
}

export default App;
