import { City } from './city.type';
import { User } from './reviews.type';

export type Offer = {
    id: string;
    title: string;
    description: string;
    type: string;
    imageSrc: string;
    price: number;
    images: string[];
    city: City;
    amentity: string[];
    author: User;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    bedrooms: number;
    maxAdults: number;
};
