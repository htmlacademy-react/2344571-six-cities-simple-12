import HeaderLogin from '../../components/HeaderLogin/HeaderLogin';
import FormLogin from '../../components/FormLogin/FormLogin';
import { generatePath, Link, Navigate } from 'react-router-dom';
import { changeActiveCity } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus, Cities } from '../../constants';

function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const { authorizationStatus } = useAppSelector((state) => state);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <Navigate to={AppRoute.Root} />
    );
  }

  const randomCity = Cities[Math.floor(Math.random() * Cities.length)];
  return (
    <div>
      <HeaderLogin />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <FormLogin />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={generatePath(AppRoute.Root)}
                onClick={() => dispatch(changeActiveCity(randomCity))}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
