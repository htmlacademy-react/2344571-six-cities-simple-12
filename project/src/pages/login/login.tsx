import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/store';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';
import { AppRoute } from '../../const';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/;

function LoginScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleEmailChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const emailValue = evt.target.value;
    setEmail(emailValue);
  }

  const handlePasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = evt.target.value;
    setPassword(passwordValue);
  };

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
      navigate(AppRoute.Main);
    }
  };

  useEffect(() => {
    if (email === '') {
      setIsValid(false);
      setError('');
    } else if (!emailRegex.test(email)) {
      setIsValid(false);
      setError('Некорректный email');
    } else {
      setError('');
    }
  }, [email]);

  useEffect(() => {
    if (password === '') {
      setIsValid(false);
      setError('');
    } else if (!passwordRegex.test(password)) {
      setIsValid(false);
      setError('Пароль должен содержать хотя бы одну букву и одну цифру.');
    } else {
      setError('');
    }
  }, [password]);

  useEffect(() => {
    if (password !== '' && passwordRegex.test(password) && email !== '' && emailRegex.test(email)) {
      setIsValid(true);
    }
  }, [email, password]);

  return (
    <div className="page page--gray page--login">
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z" /></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z" /></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z" /></symbol></svg>
      </div>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" ref={loginRef} type="email" name="email" placeholder="Email" required onChange={handleEmailChange} value={email} />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" ref={passwordRef} type="password" name="password" placeholder="Password" required value={password} onChange={handlePasswordChange} />
                <span style={{ color: 'red', display: error ? 'block' : 'none' }}>{error}</span>
              </div>
              <button className="login__submit form__submit button" type="submit" disabled={!isValid}>Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
