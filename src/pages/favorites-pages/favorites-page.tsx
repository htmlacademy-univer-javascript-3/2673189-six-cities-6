import {Helmet} from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { CardType } from '@consts/consts';
import { useAppSelector } from '@hooks/dispatch';
import PlaceCard from '@components/place-card/place-card';
import Header from '@components/header/header';
import FavoritesEmptyPage from '@pages/favorites-pages/favorites-empty-page';
import { selectOffers } from '@store/offers-data/offers-data.selectors';


export default function FavoritesPage(): JSX.Element {
  const offers = useAppSelector(selectOffers);

  const favorites = useMemo(
    () => offers.filter((offer) => offer.isFavorite),
    [offers]
  );

  const cities = useMemo(
    () => Array.from(new Set(favorites.map((offer) => offer.city.name))).sort(),
    [favorites]
  );

  if (favorites.length === 0) {
    return <FavoritesEmptyPage />;
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: Favorites</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {cities.map((city) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to="#">
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {favorites.filter((favorite) => favorite.city.name === city).map((favorite) => (
                      <PlaceCard
                        key={favorite.id}
                        offer={favorite}
                        onMouse={() => {}}
                        offMouse={() => {}}
                        cardType={CardType.Favorites}
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}
