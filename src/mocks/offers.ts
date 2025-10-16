import { Offer } from '@types';

export const offers: Offer[] = [
  {
    'id': '1',
    'title': 'Beautiful & luxurious apartment at great location',
    'type': 'apartment',
    'imageSrc' : 'img/apartment-01.jpg',
    'price': 300,
    'city': {
      'name': 'Amsterdam',
      'latitude': 52.37454,
      'longitude': 4.897976,
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 4.8
  },
  {
    'id': '2',
    'title': 'Wood and stone place',
    'type': 'room',
    'imageSrc' : 'img/room.jpg',
    'price': 200,
    'city': {
      'name': 'Amsterdam',
      'latitude': 52.37454,
      'longitude': 4.897976,
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 4.4
  },
  {
    'id': '3',
    'title': 'Canal View Prinsengracht',
    'type': 'apartment',
    'imageSrc' : 'img/apartment-02.jpg',
    'price': 151,
    'city': {
      'name': 'Amsterdam',
      'latitude': 52.37454,
      'longitude': 4.897976,
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 4.2
  },
  {
    'id': '4',
    'title': 'Nice, cozy, warm big bed apartment',
    'type': 'apartment',
    'imageSrc' : 'img/apartment-03.jpg',
    'price': 469,
    'city': {
      'name': 'Amsterdam',
      'latitude': 52.37454,
      'longitude': 4.897976,
    },

    'isFavorite': true,
    'isPremium': false,
    'rating': 3.3
  }
];
