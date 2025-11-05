import { City } from './city.type';

export type Offer = {
    id: string;
    title: string;
    type: string;
    imageSrc: string;
    price: number;
    city: City;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
};
