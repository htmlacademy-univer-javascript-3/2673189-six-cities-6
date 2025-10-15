import { Offer } from '../../types/index';
import PlaceCard from '../place-card/place-card';
import { useState } from 'react';

type OffersListProps = {
    offers: Offer[];
};


export default function OffersList({offers}: OffersListProps): JSX.Element {
  const [, setActiveOfferId] = useState<string | null>(null);

  const handleMouseEnter = (offerId: string) => {
    setActiveOfferId(offerId);
  };

  const handleMouseLeave = () => {
    setActiveOfferId(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouse={() => handleMouseEnter(offer.id)}
          offMouse={handleMouseLeave}
        />))}
    </div>
  );
}
