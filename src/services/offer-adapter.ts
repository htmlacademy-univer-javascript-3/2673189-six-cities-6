import type { Offer } from '@types';
import type { OfferDto } from '../types/offer-dto.type';

export const adaptOfferToClient = (offer: OfferDto): Offer => ({
  id: offer.id,
  title: offer.title,
  type: offer.type,
  price: offer.price,
  imageSrc: offer.previewImage ?? '',
  images: offer.images ?? [],
  city: offer.city,
  location: offer.location,
  isFavorite: offer.isFavorite,
  isPremium: offer.isPremium,
  rating: offer.rating,

  description: offer.description,
  amentity: offer.goods ?? [],
  bedrooms: offer.bedrooms,
  maxAdults: offer.maxAdults,

  author: offer.host
    ? {
      name: offer.host.name,
      avatarUrl: offer.host.avatarUrl,
      isPro: offer.host.isPro,
      email: '',
      token: '',
    }
    : undefined,
});
