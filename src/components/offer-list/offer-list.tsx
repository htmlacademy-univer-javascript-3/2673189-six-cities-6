import { Offer } from '@types';
import PlaceCard from '../place-card/place-card';
import { useState, useEffect } from 'react';

type OffersListProps = {
    offers: Offer[];
    onActiveOfferChange: (offerId: string | null) => void;
};


export default function OffersList({offers, onActiveOfferChange}: OffersListProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  useEffect(() => {
    onActiveOfferChange(activeOfferId);
  }, [activeOfferId, onActiveOfferChange]);

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
