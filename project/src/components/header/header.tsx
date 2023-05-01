import { NavLink, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { logoutAction } from '../../store/api-actions';
import { AuthorizationStatus } from '../../const';

function Header(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const userData = useAppSelector((state) => state.userData);
  const dispatch = useAppDispatch();

  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <NavLink className={({ isActive }) => isActive ? 'header__logo-link header__logo-link--active' : 'header__logo-link '} to='/'>
              <img
                className='header__logo'
                src='img/logo.svg'
                alt={'6 cities logo'}
                width={81}
                height={41}
              />
            </NavLink>
          </div>
          {
            authorizationStatus === AuthorizationStatus.Auth
              ?
              <nav className='header__nav'>
                <ul className='header__nav-list'>
                  <li className='header__nav-item user'>
                    <div className='header__nav-profile'>
                      <div className='header__avatar-wrapper user__avatar-wrapper'>
                        <img src={userData?.avatarUrl} alt='' style={{ width: '20px', height: '20px', marginRight: '8px', borderRadius: '50%' }} />
                      </div>
                      <span className='header__user-name user__name'>
                        {userData?.email}
                      </span>
                    </div>
                  </li>
                  <li className='header__nav-item'>
                    <Link className='header__nav-link' onClick={(evt) => {
                      evt.preventDefault();
                      dispatch(logoutAction());
                    }} to="/"
                    >
                      <span className='header__signout'>Sign out</span>
                    </Link>
                  </li>
                </ul>
              </nav>
              :
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to="/login">
                      <div className="header__avatar-wrapper user__avatar-wrapper" />
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                </ul>
              </nav>
          }
        </div>
      </div>
    </header>
  );
}

export { Header };
