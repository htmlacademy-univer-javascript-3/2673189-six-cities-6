import { City } from './city.type';
import { Location } from './location.type';

export type OfferDto = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage?: string;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description?: string;
  images?: string[];
  goods?: string[];
  host?: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  bedrooms?: number;
  maxAdults?: number;
};
