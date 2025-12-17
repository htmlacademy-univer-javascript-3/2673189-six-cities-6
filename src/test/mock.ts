import type { Offer, Review, User } from '@types';
import type { City, Location } from '@types';

export const makeLocation = (overrides: Partial<Location> = {}): Location =>
  ({
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13,
    ...overrides,
  } satisfies Location);

export const makeCity = (overrides: Partial<City> = {}): City =>
  ({
    name: 'Paris',
    location: makeLocation(),
    ...overrides,
  } satisfies City);

export const makeUser = (overrides: Partial<User> = {}): User =>
  ({
    name: 'John Doe',
    avatarUrl: 'img/avatar.svg',
    isPro: false,
    email: 'john@doe.com',
    token: 'token',
    ...overrides,
  } satisfies User);

export const makeOffer = (overrides: Partial<Offer> = {}): Offer =>
  ({
    id: '1',
    title: 'Nice place',
    description: 'Desc',
    type: 'apartment',
    imageSrc: 'img/apartment-01.jpg',
    price: 100,
    images: ['img/apartment-01.jpg'],
    city: makeCity(),
    location: makeLocation(),
    amentity: ['Wifi'],
    author: makeUser(),
    isFavorite: false,
    isPremium: false,
    rating: 4.2,
    bedrooms: 1,
    maxAdults: 2,
    ...overrides,
  } satisfies Offer);

export const makeReview = (overrides: Partial<Review> = {}): Review =>
  ({
    id: 'r1',
    date: '2020-01-01T00:00:00.000Z',
    user: makeUser({ name: 'Alice', avatarUrl: 'img/avatar.svg', isPro: true }),
    comment: 'Great',
    rating: 4,
    ...overrides,
  } satisfies Review);
