import { Helmet } from 'react-helmet-async';
import ReviewForm from '@components/review-form/review-form';
import { useParams, useNavigate } from 'react-router-dom';
import NotFoundPage from '@pages/not-found-page/not-found-page';
import ReviewsList from '@components/review-list/review-list';
import Map from '@components/map/map';
import { AuthStatus, MapClassName, AppRoute } from '@consts/consts';
import NearbyOffersList from '@components/nearby-offers-list/nearby-offers-list';
import { useAppDispatch, useAppSelector } from '@hooks/dispatch';
import { useEffect, useState } from 'react';
import { changeFavoriteStatusAction, fetchFavoritesAction, fetchNearbyOffersAction, fetchOfferByIdAction, fetchReviewsByOfferIdAction } from '@store/api-action';
import Header from '@components/header/header';
import LoadingPage from '@pages/loading-page/loading-page';

import { clearReviews } from '@store/reviews-data/reviews-data.slice';
import { setOfferById } from '@store/offer-data/offer-data.slice';
import { selectOfferById, selectNearbyOffers } from '@store/offer-data/offer-data.selectors';
import { selectReviews } from '@store/reviews-data/reviews-data.selectors';
import { selectAuthorizationStatus } from '@store/user-process/user-process.selectors';


export default function OfferPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const mainOffer = useAppSelector(selectOfferById);
  const nearbyOffers = useAppSelector(selectNearbyOffers);
  const reviews = useAppSelector(selectReviews);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  const [isOfferLoading, setIsOfferLoading] = useState(false);
  const [isOfferNotFound, setIsOfferNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(setOfferById(null));
    dispatch(clearReviews());

    setIsOfferNotFound(false);
    setIsOfferLoading(true);

    dispatch(fetchNearbyOffersAction(id));
    dispatch(fetchReviewsByOfferIdAction(id));

    dispatch(fetchOfferByIdAction(id))
      .unwrap()
      .catch(() => {
        setIsOfferNotFound(true);
      })
      .finally(() => {
        setIsOfferLoading(false);
      });
  }, [dispatch, id]);

  const handleFavoriteClick = () => {
    if (authorizationStatus !== AuthStatus.AUTH) {
      navigate(AppRoute.LOGIN);
      return;
    }

    if (!id || !mainOffer) {
      return;
    }

    const status = mainOffer.isFavorite ? 0 : 1;
    dispatch(changeFavoriteStatusAction({ offerId: id, status }))
      .unwrap()
      .then(() => {
        dispatch(fetchFavoritesAction());
        dispatch(fetchOfferByIdAction(id));
      });
  };

  if (!id) {
    return <NotFoundPage />;
  }

  if (isOfferLoading) {
    return <LoadingPage />;
  }

  if (isOfferNotFound) {
    return <NotFoundPage />;
  }

  if (!mainOffer) {
    return <LoadingPage />;
  }

  const images = mainOffer.images ?? [mainOffer.imageSrc];
  const amentity = mainOffer.amentity ?? [];
  const author = mainOffer.author;

  return (
    <div className="page" key={id}>
      <Helmet>
        <title>6 cities: offer {mainOffer.id}</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((image) => (
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
                <button
                  className={`offer__bookmark-button ${mainOffer.isFavorite ? 'offer__bookmark-button--active' : ''} button`}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{mainOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${(Math.round(mainOffer.rating) / 5) * 100}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{mainOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{mainOffer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">{mainOffer.bedrooms ?? 0} Bedrooms</li>
                <li className="offer__feature offer__feature--adults">Max {mainOffer.maxAdults ?? 0} adults</li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{mainOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {amentity.map((amenities) => (
                    <li key={amenities} className="offer__inside-item">
                      {amenities}
                    </li>
                  ))}
                </ul>
              </div>
              {author && (
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className={`offer__avatar-wrapper ${author.isPro && 'offer__avatar-wrapper--pro'} user__avatar-wrapper`}>
                      <img className="offer__avatar user__avatar" src={author.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="offer__user-name">{author.name}</span>
                    {author.isPro && <span className="offer__user-status">Pro</span>}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">{mainOffer.description}</p>
                  </div>
                </div>
              )}
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews ? reviews.length : 0}</span></h2>
                <ReviewsList reviews={reviews}/>
                {authorizationStatus === AuthStatus.AUTH && id ? (
                  <ReviewForm offerId={id} />
                ) : null}
              </section>
            </div>
          </div>
          <Map
            city={mainOffer.city}
            offers={[mainOffer, ...(nearbyOffers ?? [])]}
            selectedOffer={mainOffer}
            className={MapClassName.Offer}
            isInteractive={false}
            highlightSelected
          />
        </section>
        <div className="container">
          <NearbyOffersList offers={nearbyOffers}/>
        </div>
      </main>
    </div>
  );
}

