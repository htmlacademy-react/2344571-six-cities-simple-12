import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AuthorizationStatus } from '../../constants/constants';
import { logoutAction } from '../../store/user-process/api-actions';

const AuthPanel = () => {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userData = useAppSelector((state) => state.USER.userData);

  const handleOutClick = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          {authorizationStatus === AuthorizationStatus.Auth &&
            <div className="header__nav-profile">
              <div className="header__avatar-wrapper user__avatar-wrapper">
                <img src={userData?.avatarUrl} alt={userData?.name} />
              </div>
              <span className="header__user-name user__name">{userData?.email}</span>
            </div>}
        </li>
        <li className="header__nav-item">
          {authorizationStatus === AuthorizationStatus.Auth &&
            <Link className="header__nav-link" to="/login" onClick={handleOutClick}>
              <span className="header__signout">Sign out</span>
            </Link>}
          {authorizationStatus === AuthorizationStatus.NoAuth &&
            <Link className="header__nav-link header__nav-link--profile" to="/login">
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>}
        </li>
      </ul>
    </nav>
  );
};

export default AuthPanel;
