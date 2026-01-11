import {Helmet} from 'react-helmet-async';
import { FormEvent, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AppRoute, AuthStatus, CitiesID } from '@consts/consts';
import { changeCity } from '@store/app-process/app-process.slice';
import { useAppDispatch, useAppSelector } from '@hooks/dispatch';
import { loginAction } from '@store/api-action';
import Header from '@components/header/header';
import { selectAuthorizationStatus } from '@store/user-process/user-process.selectors';
import { selectError } from '@store/app-data/app-data.selectors';

const isPasswordValid = (value: string): boolean => /[A-Za-z]/.test(value) && /\d/.test(value);

const getFieldErrorsFromBackend = (backendError: string | null): { email?: string; password?: string } => {
  if (!backendError) {
    return {};
  }

  const fieldErrors: { email?: string; password?: string } = {};
  const lines = backendError.split('\n').map((l) => l.trim()).filter(Boolean);

  for (const line of lines) {
    if (/password/i.test(line)) {
      fieldErrors.password = fieldErrors.password ? `${fieldErrors.password}\n${line}` : line;
    }
    if (/email|e-mail/i.test(line)) {
      fieldErrors.email = fieldErrors.email ? `${fieldErrors.email}\n${line}` : line;
    }
  }
  if (!fieldErrors.email && !fieldErrors.password) {
    fieldErrors.password = lines.join('\n');
  }

  return fieldErrors;
};

export default function LoginPage() : JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const backendError = useAppSelector(selectError);

  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fieldErrors = useMemo(
    () => getFieldErrorsFromBackend(backendError),
    [backendError]
  );

  const randomCity = useMemo(() => {
    const cities = CitiesID.map((c) => c.name);
    return cities[Math.floor(Math.random() * cities.length)];
  }, []);

  const handleRandomCityClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(changeCity(randomCity));
    navigate(AppRoute.ROOT);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsSubmitted(true);
    emailInputRef.current?.setCustomValidity('');
    passwordInputRef.current?.setCustomValidity('');

    const passwordErrorMessage = !isPasswordValid(password)
      ? 'Пароль должен содержать буквы и цифру'
      : '';

    if (passwordErrorMessage) {
      passwordInputRef.current?.setCustomValidity(passwordErrorMessage);
      passwordInputRef.current?.reportValidity();
      return;
    }

    if (fieldErrors.email) {
      emailInputRef.current?.setCustomValidity(fieldErrors.email);
      emailInputRef.current?.reportValidity();
      return;
    }

    if (fieldErrors.password) {
      passwordInputRef.current?.setCustomValidity(fieldErrors.password);
      passwordInputRef.current?.reportValidity();
      return;
    }

    dispatch(loginAction({login: email, password}));
  };

  if (authorizationStatus === AuthStatus.AUTH) {
    return <Navigate to={AppRoute.ROOT} />;
  }

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities: Authorization</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>

            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={emailInputRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailInputRef.current) {
                      emailInputRef.current.setCustomValidity('');
                    }
                  }}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordInputRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (isSubmitted && passwordInputRef.current) {
                      passwordInputRef.current.setCustomValidity(isPasswordValid(e.target.value) ? '' : 'Пароль должен содержать буквы и цифру');
                    } else if (passwordInputRef.current) {
                      passwordInputRef.current.setCustomValidity('');
                    }
                  }}
                  required
                />
                {backendError && (
                  <span className="visually-hidden" data-testid="login-error" />
                )}
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.ROOT} onClick={handleRandomCityClick}>
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
