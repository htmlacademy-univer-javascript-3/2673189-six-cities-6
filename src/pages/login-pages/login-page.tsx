import {Helmet} from 'react-helmet-async';
import { FormEvent, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AppRoute, AuthStatus, CitiesID } from '@consts/consts';
import { changeCity } from '@store/app-process/app-process.slice';
import { useAppDispatch, useAppSelector } from '@hooks/dispatch';
import { loginAction } from '@store/api-action';
import Header from '@components/header/header';
import { selectAuthorizationStatus } from '@store/user-process/user-process.selectors';
import { selectError } from '@store/app-data/app-data.selectors';

const isPasswordValid = (value: string): boolean => /[A-Za-z]/.test(value) && /\d/.test(value);

export default function LoginPage() : JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const backendError = useAppSelector(selectError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordError = useMemo(() => {
    if (password.length === 0) {
      return null;
    }
    if (!isPasswordValid(password)) {
      return 'Пароль должен содержать минимум 1 букву и 1 цифру.';
    }
    return null;
  }, [password]);

  const isFormValid = isPasswordValid(password);

  const randomCity = useMemo(() => {
    const cities = CitiesID.map((c) => c.name);
    return cities[Math.floor(Math.random() * cities.length)];
  }, []);

  const handleRandomCityClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(changeCity(randomCity));
    navigate(AppRoute.ROOT);
  };

  if (authorizationStatus === AuthStatus.AUTH) {
    return <Navigate to={AppRoute.ROOT} />;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isPasswordValid(password)) {
      return;
    }

    dispatch(loginAction({login: email, password}));
  };

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
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className={`login__input form__input${passwordError ? ' form__input--error' : ''}`}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {(passwordError || backendError) && (
                  <div className="login__message" data-testid="login-error">
                    {passwordError && <p>{passwordError}</p>}
                    {backendError && backendError.split('\n').map((line) => <p key={line}>{line}</p>)}
                  </div>
                )}
              </div>
              <button className="login__submit form__submit button" type="submit" disabled={!isFormValid}>Sign in</button>
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
