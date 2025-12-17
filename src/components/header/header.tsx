import { Link } from 'react-router-dom';
import { AppRoute, AuthStatus } from '@consts/consts';
import { useAppDispatch, useAppSelector } from '@hooks/dispatch';
import { logoutAction } from '@store/api-action';
import { useCallback, useMemo } from 'react';
import { selectAuthorizationStatus, selectUser } from '@store/user-process/user-process.selectors';
import { selectOffers } from '@store/offers-data/offers-data.selectors';

type HeaderProps = {
  isLogoActive?: boolean;
};

export default function Header({ isLogoActive = false }: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const user = useAppSelector(selectUser);
  const offers = useAppSelector(selectOffers);

  const favoritesCount = useMemo(
    () => offers.filter((offer) => offer.isFavorite).length,
    [offers]
  );
  const isAuth = authorizationStatus === AuthStatus.AUTH;

  const handleLogoutClick = useCallback(
    (evt: React.MouseEvent<HTMLAnchorElement>) => {
      evt.preventDefault();
      dispatch(logoutAction());
    },
    [dispatch]
  );

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className={
                isLogoActive ? 'header__logo-link header__logo-link--active' : 'header__logo-link'
              }
              to={AppRoute.ROOT}
            >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuth ? (
                <>
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.FAVORITES}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper" />
                      <span className="header__user-name user__name">{user?.email ?? ''}</span>
                      <span className="header__favorite-count">{favoritesCount}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#" onClick={handleLogoutClick}>
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
              ) : (
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.LOGIN}>
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
