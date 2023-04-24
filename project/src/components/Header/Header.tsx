import Logo from '../Logo/Logo';
import UserInfo from '../UserInfo/UserInfo';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-actions';

function Header(): JSX.Element {
  const user = useAppSelector((state) => state.user);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuth && <UserInfo user={user} />}
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
        </div>
      </div>
    </header>
  );
}

export default Header;
