import {Helmet} from 'react-helmet-async';
import OffersList from '@components/offer-list/offer-list';
import Map from '@components/map/map';
import { useMemo, useState } from 'react';
import { MapClassName, SortType, CitiesID } from '@consts/consts';
import { Offer } from '@types';
import CitiesList from '@components/cities-list/cities-list';
import { useAppSelector } from '@hooks/dispatch';
import SortOptions from '@components/sort-options/sort-options';
import Header from '@components/header/header';

import { selectCity } from '@store/app-process/app-process.selectors';
import { selectSortType } from '@store/app-process/app-process.selectors';
import { selectOffers } from '@store/offers-data/offers-data.selectors';


export default function MainPage(): JSX.Element {
  const offers = useAppSelector(selectOffers);
  const city = useAppSelector(selectCity);
  const sortType = useAppSelector(selectSortType);

  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const cityByOffer = useMemo<Offer[]>(() => {
    const filteredOffers = offers.filter((offer) => offer.city.name === city);

    return [...filteredOffers].sort((a, b) => {
      switch (sortType) {
        case SortType.PriceLowToHigh:
          return a.price - b.price;
        case SortType.PriceHighToLow:
          return b.price - a.price;
        case SortType.TopRated:
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [city, offers, sortType]);

  const selectedOffer = useMemo(
    () => offers.find((offer) => offer.id === activeOfferId),
    [activeOfferId, offers]
  );

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header isLogoActive />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={CitiesID} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${cityByOffer.length} places to stay in ${city}`}</b>
              <SortOptions />
              <OffersList offers={cityByOffer} onActiveOfferChange={setActiveOfferId}/>
            </section>
            <div className="cities__right-section">
              <Map
                city={cityByOffer[0]?.city}
                offers={cityByOffer}
                selectedOffer={selectedOffer}
                className={MapClassName.Main}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
