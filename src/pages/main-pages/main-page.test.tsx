import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

import MainPage from './main-page';
import { makeCity, makeOffer } from '@test/mock';
import { NameSpace, SortType } from '@consts/consts';

vi.mock('@components/header/header', () => ({
  default: () => <div data-testid="header" />,
}));

vi.mock('@components/main-empty/main-empty', () => ({
  default: () => <div>MainEmpty</div>,
}));

vi.mock('@components/cities-list/cities-list', () => ({
  default: () => <div data-testid="cities-list" />,
}));

vi.mock('@components/sort-options/sort-options', () => ({
  default: () => <div data-testid="sort-options" />,
}));

vi.mock('@components/offer-list/offer-list', () => ({
  default: () => <div data-testid="offers-list" />,
}));

vi.mock('@components/map/map', () => ({
  default: () => <div data-testid="map" />,
}));

let mockCity = 'Paris';
let mockSortType: SortType = SortType.Popular;
let mockOffers: ReturnType<typeof makeOffer>[] = [];

vi.mock('@hooks/dispatch', () => ({
  useAppSelector: (selector: unknown) => {
    if (typeof selector !== 'function') {
      return undefined;
    }

    const fakeState = {
      [NameSpace.Offers]: { offers: mockOffers, isOffersDataLoading: false },
      [NameSpace.AppProcess]: { city: mockCity, sortType: mockSortType },
      [NameSpace.User]: { authorizationStatus: 'NO_AUTH', user: null },
    };

    return (selector as (s: unknown) => unknown)(fakeState);
  },
}));

describe('Page: MainPage', () => {
  it('Should render MainEmpty when no offers for current city', () => {
    mockCity = 'Paris';
    mockSortType = SortType.Popular;
    mockOffers = [makeOffer({ id: '1', city: makeCity({ name: 'Amsterdam' }) })];

    render(
      <HelmetProvider>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByText('MainEmpty')).toBeInTheDocument();
  });

  it('Should render offers block when offers exist for city', () => {
    mockCity = 'Paris';
    mockSortType = SortType.Popular;
    mockOffers = [makeOffer({ id: '1', city: makeCity({ name: 'Paris' }) })];

    render(
      <HelmetProvider>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.queryByText('MainEmpty')).not.toBeInTheDocument();
    expect(screen.getByTestId('cities-list')).toBeInTheDocument();
    expect(screen.getByTestId('sort-options')).toBeInTheDocument();
    expect(screen.getByTestId('offers-list')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();

    expect(screen.getByText(/places to stay in Paris/i)).toBeInTheDocument();
  });
});
