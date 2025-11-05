
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import { AppRoute, AuthStatus } from '@consts/consts';
import PrivateRoute from '../private-route/private-route';
import FavoritesPage from '@pages/favorites-pages/favorites-page';
import LoginPage from '@pages/login-pages/login-page';
import MainPage from '@pages/main-pages/main-page';
import OfferPage from '@pages/offer-pages/offer-page';

import NotFoundPage from '@pages/not-found-page/not-found-page';
import { Offer, Review } from '@types';

type AppProps = {
    placesCnt: number;
    offers: Offer[];
    reviews: Review[];
}

export default function App({placesCnt, offers, reviews}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.ROOT}
            element={<MainPage placesCnt={placesCnt} offers={offers}/>}
          />
          <Route
            path={AppRoute.LOGIN}
            element={<LoginPage />}
          />
          <Route
            path={AppRoute.FAVORITES}
            element={
              <PrivateRoute
                authorizationStatus={AuthStatus.AUTH}
              >
                <FavoritesPage offers={offers}/>
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.OFFER}/:id`}
            element={<OfferPage offers={offers} reviews={reviews} />}
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
