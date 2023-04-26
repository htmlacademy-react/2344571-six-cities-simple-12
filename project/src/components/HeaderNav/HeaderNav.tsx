import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { logoutAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import UserInfo from '../UserInfo/UserInfo';

function HeaderNav (): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const dispatch = useAppDispatch();

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {isAuth && <UserInfo />}
        <li className="header__nav-item">
          {!isAuth && <div className="header__avatar-wrapper user__avatar-wrapper" />}
          {!isAuth
            ?
            <Link to={AppRoute.Login} className="header__nav-link" >
              <span className="header__signout">Sign in</span>
            </Link>
            :
            <Link
              to={AppRoute.Login}
              className="header__nav-link"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
              }}
            >
              <span className="header__signout">Sign out</span>
            </Link>}
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;
