
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import { AppRoute, AuthStatus } from '@consts/consts';
import { useAppDispatch, useAppSelector } from '@hooks/dispatch';
import { setOffers, setReviews } from '@store/action';
import PrivateRoute from '../private-route/private-route';
import FavoritesPage from '@pages/favorites-pages/favorites-page';
import LoginPage from '@pages/login-pages/login-page';
import MainPage from '@pages/main-pages/main-page';
import OfferPage from '@pages/offer-pages/offer-page';
import NotFoundPage from '@pages/not-found-page/not-found-page';


export default function App(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const reviews = useAppSelector((state) => state.reviews);
  const dispatch = useAppDispatch();

  dispatch(setOffers(offers));
  dispatch(setReviews(reviews));
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
            element={<LoginPage />}
          />
          <Route
            path={AppRoute.FAVORITES}
            element={
              <PrivateRoute
                authorizationStatus={AuthStatus.AUTH}
              >
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
