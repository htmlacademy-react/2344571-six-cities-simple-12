import { FormEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthData } from '../../types/auth-data';
import { toast } from 'react-toastify';
import Logo from '../../components/logo';
import { AuthorizationStatus } from '../../constants/enum';
import { AppRoute } from '../../router/RoutePath';
import { Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { isPasswordValidate } from './helpers';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { loginAction } from '../../store/user-process/api-actions';

const Login = () => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      if (isPasswordValidate(passwordRef.current.value)) {
        onSubmit({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        });
      } else {
        toast.warn('Passwords must contain: minimum of 1 letter and minimum of 1 numeric character [0-9]');
      }
    }
  };

  return (authorizationStatus === AuthorizationStatus.Auth ?
    <Navigate to={AppRoute.Root} /> : (
      <div>
        <div className="page page--gray page--login">
          <header className="header">
            <div className="container">
              <div className="header__wrapper">
                <div className="header__left">
                  <Logo />
                </div>
              </div>
            </div>
          </header>

          <main className="page__main page__main--login">
            <div className="page__login-container container">
              <section className="login">
                <h1 className="login__title">Sign in</h1>
                <form className="login__form form" action="" onSubmit={handleSubmit}>
                  <div className="login__input-wrapper form__input-wrapper">
                    <label htmlFor="login-email" className="visually-hidden">E-mail</label>
                    <input
                      id="login-email"
                      data-testid="login"
                      className="login__input form__input"
                      type="email"
                      name="email"
                      placeholder="Email"
                      ref={loginRef}
                      required
                    />
                  </div>
                  <div className="login__input-wrapper form__input-wrapper">
                    <label htmlFor="login-password" className="visually-hidden">Password</label>
                    <input
                      id="login-password"
                      data-testid="password"
                      className="login__input form__input"
                      type="password"
                      name="password"
                      ref={passwordRef}
                      placeholder="Password"
                      required
                    />
                  </div>
                  <button className="login__submit form__submit button" type="submit">Sign in</button>
                </form>
              </section>
              <section className="locations locations--login locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>Paris</span>
                  </a>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    ));
};

export default Login;
