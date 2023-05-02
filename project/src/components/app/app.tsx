import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainScreen from '../../pages/main1/main1';
import Login from '../../pages/login1/login1';
import ErrorScreen from '../../pages/not-found/not-found';
import PropertyScreen from '../../pages/property/property';
import Layout from '../layout/layout';
import { useAppSelector } from '../../hooks/store';
import LoaderComponent from '../loader/loader';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const isRoomsLoading = useAppSelector((state) => state.isRoomsLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isRoomsLoading) {
    return (
      <LoaderComponent />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />}>
          <Route index element={<MainScreen />} />
          {authorizationStatus !== AuthorizationStatus.Auth && <Route path={AppRoute.Login} element={<Login />} />}
          <Route path={AppRoute.Room}>
            <Route path=':id' element={<PropertyScreen />} />
          </Route>
          <Route path='*' element={<ErrorScreen />} />
        </Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
