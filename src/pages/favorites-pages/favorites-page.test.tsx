import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

import FavoritesPage from './favorites-page';
import { makeCity, makeOffer } from '@test/mock';

vi.mock('@components/header/header', () => ({
  default: () => <div data-testid="header" />,
}));

vi.mock('@pages/favorites-pages/favorites-empty-page', () => ({
  default: () => <div>FavoritesEmptyPage</div>,
}));

vi.mock('@components/place-card/place-card', () => ({
  default: ({ offer }: { offer: { title: string } }) => <div>{offer.title}</div>,
}));

let mockOffers: ReturnType<typeof makeOffer>[] = [];

vi.mock('@hooks/dispatch', () => ({
  useAppSelector: () => mockOffers,
}));

describe('Page: FavoritesPage', () => {
  it('Should render empty page when no favorites', () => {
    mockOffers = [makeOffer({ id: '1', isFavorite: false })];

    render(
      <HelmetProvider>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByText('FavoritesEmptyPage')).toBeInTheDocument();
  });

  it('Should render grouped favorites when favorites exist', () => {
    mockOffers = [
      makeOffer({
        id: '1',
        title: 'Fav Paris',
        isFavorite: true,
        city: makeCity({ name: 'Paris' }),
      }),
      makeOffer({
        id: '2',
        title: 'Fav Amsterdam',
        isFavorite: true,
        city: makeCity({ name: 'Amsterdam' }),
      }),
      makeOffer({ id: '3', title: 'Not favorite', isFavorite: false }),
    ];

    render(
      <HelmetProvider>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();

    expect(screen.getByText('Fav Paris')).toBeInTheDocument();
    expect(screen.getByText('Fav Amsterdam')).toBeInTheDocument();
    expect(screen.queryByText('Not favorite')).not.toBeInTheDocument();
  });
});
