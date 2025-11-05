import { Offer } from '@types';

export const offers: Offer[] = [
  {
    'id': '1',
    'title': 'Beautiful & luxurious apartment at great location',
    'description': 'This is a place for dreamers to reset, reflect, and create. Designed with a \'slow\' pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning, choosing the perfect record to put on as the sun sets.',
    'type': 'apartment',
    'imageSrc' : 'https://14.design.htmlacademy.pro/static/hotel/19.jpg',
    'price': 300,
    'images': [
      'https://14.design.htmlacademy.pro/static/hotel/9.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/8.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/19.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/3.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/5.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/1.jpg'
    ],
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.3909553943508,
        'longitude': 4.85309666406198,
        'zoom': 16
      }
    },
    'amentity': [
      'Breakfast',
      'Kitchen',
      'Towels',
      'Fridge',
      'Cable TV',
      'Air conditioning',
      'Baby seat',
      'Coffee machine',
      'Washer',
      'Wi-Fi',
      'Heating',
      'Laptop friendly workspace'
    ],
    'author': {
      'isPro': true,
      'name': 'Angelina',
      'avatarUrl': 'https://14.design.htmlacademy.pro/static/host/avatar-angelina.jpg'
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 4.8,
    'bedrooms': 5,
    'maxAdults': 4
  },
  {
    'id': '2',
    'title': 'Wood and stone place',
    'description': 'I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.',
    'type': 'room',
    'imageSrc' : 'https://14.design.htmlacademy.pro/static/hotel/1.jpg',
    'price': 200,
    'images': [
      'https://14.design.htmlacademy.pro/static/hotel/10.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/4.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/7.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/14.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/2.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/20.jpg'
    ],
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.3609553943508,
        'longitude': 4.85309666406198,
        'zoom': 16
      }
    },
    'amentity': [
      'Breakfast',
      'Coffee machine',
      'Kitchen',
      'Towels',
      'Cable TV',
      'Washer',
      'Baby seat',
      'Wi-Fi',
      'Washing machine',
      'Laptop friendly workspace',
      'Heating'
    ],
    'author': {
      'isPro': true,
      'name': 'Angelina',
      'avatarUrl': 'https://14.design.htmlacademy.pro/static/host/avatar-angelina.jpg'
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 4.4,
    'bedrooms': 1,
    'maxAdults': 7
  },
  {
    'id': '3',
    'title': 'Canal View Prinsengracht',
    'description': 'This is a place for dreamers to reset, reflect, and create. Designed with a \'slow\' pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning, choosing the perfect record to put on as the sun sets.',
    'type': 'apartment',
    'imageSrc' : 'https://14.design.htmlacademy.pro/static/hotel/8.jpg',
    'price': 151,
    'images': [
      'https://14.design.htmlacademy.pro/static/hotel/9.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/3.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/1.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/16.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/12.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/10.jpg'
    ],
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.3909553943508,
        'longitude': 4.929309666406198,
        'zoom': 16
      }
    },
    'amentity': [
      'Cable TV',
      'Coffee machine',
      'Heating'
    ],
    'author': {
      'isPro': true,
      'name': 'Angelina',
      'avatarUrl': 'https://14.design.htmlacademy.pro/static/host/avatar-angelina.jpg'
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 4.2,
    'bedrooms': 4,
    'maxAdults': 9
  },
  {
    'id': '4',
    'title': 'Nice, cozy, warm big bed apartment',
    'description': 'This is a place for dreamers to reset, reflect, and create. Designed with a \'slow\' pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning, choosing the perfect record to put on as the sun sets.',
    'type': 'apartment',
    'imageSrc' : 'https://14.design.htmlacademy.pro/static/hotel/19.jpg',
    'price': 469,
    'images': [
      'https://14.design.htmlacademy.pro/static/hotel/20.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/9.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/14.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/6.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/3.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/11.jpg'
    ],
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.3809553943508,
        'longitude': 4.939309666406198,
        'zoom': 16
      }
    },
    'amentity': [
      'Baby seat',
      'Washer',
      'Air conditioning',
      'Kitchen',
      'Breakfast',
      'Fridge',
      'Coffee machine',
      'Cable TV',
      'Heating',
      'Washing machine',
      'Wi-Fi',
      'Dishwasher',
      'Laptop friendly workspace'
    ],
    'author': {
      'isPro': true,
      'name': 'Angelina',
      'avatarUrl': 'https://14.design.htmlacademy.pro/static/host/avatar-angelina.jpg'
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 3.3,
    'bedrooms': 5,
    'maxAdults': 5
  }
];
