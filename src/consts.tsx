export const PLACES_CNT = 312;

export enum AppRoute {
  ROOT = '/',
  LOGIN = '/login',
  FAVORITES = '/favorites',
  OFFER = '/offer/:id',
}

export enum AuthStatus {
  AUTH ='AUTH',
  NOAUTH = 'NO_AUTH',
  UNKNOWN = 'UNKNOWN',
}
