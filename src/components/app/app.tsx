import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthStatus } from '@consts/consts';
import { useAppSelector } from '@hooks/dispatch';
import PrivateRoute from '../private-route/private-route';
import FavoritesPage from '@pages/favorites-pages/favorites-page';
import LoginPage from '@pages/login-pages/login-page';
import MainPage from '@pages/main-pages/main-page';
import OfferPage from '@pages/offer-pages/offer-page';
import NotFoundPage from '@pages/not-found-page/not-found-page';
import LoadingPage from '@pages/loading-page/loading-page';

import { selectAuthorizationStatus } from '@store/user-process/user-process.selectors';
import { selectOffersDataLoadingStatus } from '@store/offers-data/offers-data.selectors';


export default function App(): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(selectOffersDataLoadingStatus);

  if (authorizationStatus === AuthStatus.UNKNOWN || isOffersDataLoading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.ROOT}
            element={<MainPage />}
          />
          <Route
            path={AppRoute.LOGIN}
            element={
              authorizationStatus === AuthStatus.AUTH
                ? <Navigate to={AppRoute.ROOT} />
                : <LoginPage />
            }
          />
          <Route
            path={AppRoute.FAVORITES}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.OFFER}/:id`}
            element={<OfferPage />}
          />
          <Route
            path='*'
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
