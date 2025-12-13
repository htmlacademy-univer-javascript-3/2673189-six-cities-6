import {Helmet} from 'react-helmet-async';
import { FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '@consts/consts';
import { useAppDispatch, useAppSelector } from '@hooks/dispatch';
import { loginAction } from '@store/api-action';
import Header from '@components/header/header';

export default function LoginPage() : JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (authorizationStatus === AuthStatus.AUTH) {
    return <Navigate to={AppRoute.ROOT} />;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
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
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
