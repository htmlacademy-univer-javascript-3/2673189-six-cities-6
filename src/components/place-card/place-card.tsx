import { Offer } from '@types';
import { Link } from 'react-router-dom';
import { AppRoute, CardImageWrapperClass, CardType } from '@consts/consts';

type PlaceCardProps = {
  offer: Offer;
  onMouse: () => void;
  offMouse: () => void;
  cardType: CardType;
}

export default function PlaceCard({ offer, onMouse, offMouse, cardType } : PlaceCardProps) : JSX.Element {
  const ratingWidth = `${(Math.round(offer.rating) / 5) * 100}%`;

  return (
    <article className={`${cardType} place-card`}
      onMouseEnter={onMouse}
      onMouseLeave={offMouse}
    >
      {offer.isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        :
        null}
      <div className={`${CardImageWrapperClass[cardType]} place-card__image-wrapper`}>
        <Link to={`${AppRoute.OFFER}/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.imageSrc}
            width={cardType === CardType.Favorites ? 150 : 260}
            height={cardType === CardType.Favorites ? 110 : 200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${cardType === CardType.Favorites ? 'favorites__card-info' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {offer.isFavorite ?
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">In bookmarks</span>
            </button>
            :
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>}
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratingWidth}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.OFFER.replace(':id', offer.id)}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
