export const PLACES_CNT: number = 312;

export enum AppRoute {
  ROOT = '/',
  LOGIN = '/login',
  FAVORITES = '/favorites',
  OFFER = '/offer',
}

export enum AuthStatus {
  AUTH ='AUTH',
  NOAUTH = 'NO_AUTH',
  UNKNOWN = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT = '/img/pin.svg';

export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export enum CardType {
    Regular = 'cities__card',
    Nearest = 'near-places__card',
    Favorites = 'favorites__card',
  }

export const CardImageWrapperClass = {
  [CardType.Regular]: 'cities__image-wrapper',
  [CardType.Nearest]: 'near-places__image-wrapper',
  [CardType.Favorites]: 'favorites__image-wrapper',
};

export const MapClassName = {
  Offer: 'offer__map map',
  Main: 'cities__map map',
};

export const CitiesID = [
  {
    name: 'Paris',
    id: 1,
  },
  {
    name: 'Cologne',
    id: 2,
  },
  {
    name: 'Brussels',
    id: 3,
  },
  {
    name: 'Amsterdam',
    id: 4,
  },
  {
    name: 'Hamburg',
    id: 5,
  },
  {
    name: 'Dusseldorf',
    id: 6,
  },
];

export enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}
