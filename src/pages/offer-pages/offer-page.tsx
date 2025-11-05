import { Helmet } from 'react-helmet-async';
import { AppRoute } from '@consts/consts';
import ReviewForm from '@components/review-form/review-form';
import {useParams} from 'react-router-dom';
import { Offer, Review } from '@types';
import NotFoundPage from '@pages/not-found-page/not-found-page';
import ReviewsList from '@components/review-list/review-list';
import Map from '@components/map/map';
import { MapClassName } from '@consts/consts';
import NearbyOffersList from '@components/nearby-offers-list/nearby-offers-list';

type OfferPageProps = {
  offers: Offer[];
  reviews: Review[];
};

export default function OfferPage({ offers, reviews }: OfferPageProps): JSX.Element {
  const params = useParams();
  const mainOffer = offers.find((item) => item.id === params.id);

  if (!mainOffer) {
    return <NotFoundPage />;
  }

  const nearbyOffers = offers.filter(
    (offer) => offer.city.name === mainOffer.city.name && offer.id !== mainOffer.id
  ).slice(0, 3);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: offer {mainOffer.id}</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href={AppRoute.ROOT}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {mainOffer.images.map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {mainOffer.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {mainOffer.title}
                </h1>
                <button className={`offer__bookmark-button ${mainOffer.isFavorite && 'offer__bookmark-button--active'} button`} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{mainOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `calc(100% / 5 * ${mainOffer.rating})`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{mainOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{mainOffer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">{mainOffer.bedrooms} Bedrooms</li>
                <li className="offer__feature offer__feature--adults">Max {mainOffer.maxAdults} adults</li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{mainOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {mainOffer.amentity.map((amentity) => (
                    <li key={amentity} className="offer__inside-item">
                      {amentity}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${mainOffer.author.isPro && 'offer__avatar-wrapper--pro'} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={mainOffer.author.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">{mainOffer.author.name}</span>
                  {mainOffer.author.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{mainOffer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews ? reviews.length : 0}</span></h2>
                <ReviewsList reviews={reviews}/>
                <ReviewForm/>
              </section>
            </div>
          </div>
          <Map
            city={mainOffer.city}
            offers={[mainOffer, ...nearbyOffers]}
            selectedOffer={mainOffer}
            className={MapClassName.Offer}
          />
        </section>
        <div className="container">
          <NearbyOffersList offers={nearbyOffers}/>
        </div>
      </main>
    </div>
  );
}

