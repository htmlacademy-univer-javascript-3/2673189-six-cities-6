
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import { AppRoute, AuthStatus } from '../../consts';
import PrivateRoute from '../private-route/private-route';
import FavoritesPage from '../../pages/favorites-pages/favorites-page';
import LoginPage from '../../pages/login-pages/login-page';
import MainPage from '../../pages/main-pages/main-page';
import OfferPage from '../../pages//offer-pages/offer-page';

import NotFoundPage from '../../pages/not-found-page/not-found-page';

type AppProps = {
    placesCnt: number;
}

export default function App({placesCnt}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.ROOT}
            element={<MainPage placesCnt={placesCnt}/>}
          />
          <Route
            path={AppRoute.LOGIN}
            element={<LoginPage />}
          />
          <Route
            path={AppRoute.FAVORITES}
            element={
              <PrivateRoute
                authorizationStatus={AuthStatus.NOAUTH}
              >
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.OFFER}
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
