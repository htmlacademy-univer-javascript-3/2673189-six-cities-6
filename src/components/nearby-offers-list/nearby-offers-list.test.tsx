import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import NearbyOffersList from './nearby-offers-list';
import { makeOffer } from '@test/mock';

vi.mock('@components/place-card/place-card', () => ({
  default: ({ offer }: { offer: { title: string } }) => <div>{offer.title}</div>,
}));

describe('Component: NearbyOffersList', () => {
  it('Should render placeholder when no offers provided', () => {
    render(<NearbyOffersList offers={[]} />);
    expect(screen.getByText('No places in the neighbourhood available')).toBeInTheDocument();
  });

  it('Should render list of place cards when offers provided', () => {
    render(<NearbyOffersList offers={[makeOffer({ id: '1', title: 'Nearby 1' })]} />);
    expect(screen.getByText('Nearby 1')).toBeInTheDocument();
  });
});
