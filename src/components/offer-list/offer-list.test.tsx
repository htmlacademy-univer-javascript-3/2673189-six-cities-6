import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import OffersList from './offer-list';
import { makeOffer } from '@test/mock';

vi.mock('@components/place-card/place-card', () => ({
  default: ({ offer, onMouse, offMouse }: { offer: { title: string }; onMouse: () => void; offMouse: () => void }) => (
    <div>
      <button type="button" onMouseEnter={onMouse} onMouseLeave={offMouse}>
        {offer.title}
      </button>
    </div>
  ),
}));

describe('Component: OffersList', () => {
  it('Should call onActiveOfferChange on hover and mouse leave', async () => {
    const user = userEvent.setup();
    const onActiveOfferChange = vi.fn();

    const offers = [
      makeOffer({ id: '1', title: 'Offer 1' }),
      makeOffer({ id: '2', title: 'Offer 2' }),
    ];

    render(<OffersList offers={offers} onActiveOfferChange={onActiveOfferChange} />);

    await user.hover(screen.getByRole('button', { name: 'Offer 1' }));
    expect(onActiveOfferChange).toHaveBeenLastCalledWith('1');

    await user.unhover(screen.getByRole('button', { name: 'Offer 1' }));
    expect(onActiveOfferChange).toHaveBeenLastCalledWith(null);
  });
});
