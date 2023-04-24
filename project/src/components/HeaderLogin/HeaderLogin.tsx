import Logo from '../Logo/Logo';

function HeaderLogin (): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderLogin;
