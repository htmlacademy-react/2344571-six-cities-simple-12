import Logo from '../Logo/Logo';
import { useState } from 'react';
import UserInfo from '../UserInfo/UserInfo';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

function Header(): JSX.Element {
  const user = useAppSelector((state) => state.user);
  const [isAuth,] = useState(true);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuth ? <UserInfo user={user} /> : null}
              <li className="header__nav-item">
                {isAuth
                  ? null
                  : <div className="header__avatar-wrapper user__avatar-wrapper" />}
                <Link to={'/login'} className="header__nav-link">
                  <span className="header__signout">{isAuth ? 'Sign out' : 'Sign in'}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
