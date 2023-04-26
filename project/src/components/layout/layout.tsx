import { Outlet } from 'react-router-dom';
import Logo from '../logo';
import AuthPanel from '../auth-panel';

const Layout = () => (
  <div className="page page--gray page--main">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <AuthPanel />
        </div>
      </div>
    </header>
    <Outlet />
  </div>
);


export default Layout;
