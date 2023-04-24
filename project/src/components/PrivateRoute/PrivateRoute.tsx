import { AppRoute, AuthorizationStatus } from '../../constants';
import Loader from '../loader/loader';
import { useAppSelector } from '../../hooks';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
	children: JSX.Element;
}

const isCheckedAuth = (authorizationStatus: string): boolean => authorizationStatus === AuthorizationStatus.Unknown;

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const { authorizationStatus } = useAppSelector((state) => state);

  if (isCheckedAuth(authorizationStatus)) {
    return (
      <Loader />
    );
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;
