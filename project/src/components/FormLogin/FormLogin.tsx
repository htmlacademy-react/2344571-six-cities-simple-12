import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import cn from 'classnames';
import { AuthDataType } from '../../types/user';
import { loginAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../../constants';
import Loader from '../loader/loader';
import styles from './FormLogin.module.css';

const formFields = {
  email: 'E-mail',
  password: 'Password'
};

type FieldProps = {
	value: string;
	hasValue: boolean;
	isValid: boolean;
	errorText: string;
	regex: RegExp;
}

type FormStateProps = {
	[key: string]: FieldProps;
}

const FormLogin = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authorizationStatus } = useAppSelector((state) => state);

  const [formState, setFormState] = useState<FormStateProps>({
    email: {
      value: '',
      hasValue: false,
      isValid: false,
      errorText: 'please enter a real email address',
			regex: /^([A-Za-z0-9_\-])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/, // eslint-disable-line
    },
    password: {
      value: '',
      hasValue: false,
      isValid: false,
      errorText: 'at least 1 letter and 1 number',
      regex: /\d+[a-zA-Z]+|[a-zA-Z]+\d+/,
    }
  });

  const onSubmit = (authData: AuthDataType) => {
    dispatch(loginAction(authData));

    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Root);
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    onSubmit({
      login: formState.email.value,
      password: formState.password.value,
    });
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    const rule = formState[name].regex;
    const isValid = rule.test(value);
    const hasValue = !!value.trim();

    setFormState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value,
        isValid,
        hasValue,
      }
    }));
  };

  return (
    <form
      className="login__form form"
      action=""
      method=""
      onSubmit={handleSubmit}
    >
      {Object.entries(formFields).map(([name, label]) => {
        const wrapperClass = cn('login__input-wrapper form__input-wrapper', { [styles.wrapper]: true });
        const inputClass = cn('login__input form__input', { [styles.error]: !formState[name].isValid && formState[name].hasValue });

        return (
          <div className={wrapperClass} key={name}>
            <label className="visually-hidden">{label}</label>
            <input
              className={inputClass}
              type={name}
              name={name}
              placeholder={label}
              required
              value={formState[name].value}
              onChange={handleChange}
            />
            {!formState[name].isValid && formState[name].hasValue && <p className={styles.text}>{formState[name].errorText}</p>}
          </div>
        );
      })}
      <button
        className="login__submit form__submit button"
        type="submit"
        disabled={!(formState.email.isValid && formState.password.isValid)}
      >
        {authorizationStatus === AuthorizationStatus.Unknown
          ? <Loader/>
          : 'Sign in'}
      </button>
    </form>
  );
};

export default FormLogin;
