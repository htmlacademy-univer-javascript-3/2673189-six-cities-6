import { Offer } from '@types';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, CardImageWrapperClass, CardType, AuthStatus } from '@consts/consts';
import { useAppDispatch, useAppSelector } from '@hooks/dispatch';
import { selectAuthorizationStatus } from '@store/user-process/user-process.selectors';
import { changeFavoriteStatusAction, fetchFavoritesAction } from '@store/api-action';

type PlaceCardProps = {
  offer: Offer;
  onMouse: () => void;
  offMouse: () => void;
  cardType: CardType;
}

export default function PlaceCard({ offer, onMouse, offMouse, cardType } : PlaceCardProps) : JSX.Element {
  const ratingWidth = `${(Math.round(offer.rating) / 5) * 100}%`;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  const handleFavoriteClick = () => {
    if (authorizationStatus !== AuthStatus.AUTH) {
      navigate(AppRoute.LOGIN);
      return;
    }

    const status = offer.isFavorite ? 0 : 1;
    dispatch(changeFavoriteStatusAction({ offerId: offer.id, status }))
      .unwrap()
      .then(() => {
        dispatch(fetchFavoritesAction());
      });
  };

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
          <button
            className={`place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
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
