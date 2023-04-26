import Logo from '../Logo/Logo';

type HeaderProps = {
	children?: JSX.Element;
}

function Header({ children }: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo/>
          </div>
          {children}
        </div>
      </div>
    </header>
  );
}

export default Header;
