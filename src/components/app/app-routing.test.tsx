import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

let mockInitialEntries: string[] = ['/'];

import App from './app';

vi.mock('@hooks/dispatch', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: (selector: unknown) => {
    if (typeof selector === 'function') {
      const fakeState = {
        USER: { authorizationStatus: 'NO_AUTH', user: null },
        OFFERS: { offers: [], isOffersDataLoading: false },
      };
      return (selector as (s: unknown) => unknown)(fakeState);
    }
    return undefined;
  },
}));

vi.mock('@pages/main-pages/main-page', () => ({ default: () => <div>MainPage</div> }));
vi.mock('@pages/login-pages/login-page', () => ({ default: () => <div>LoginPage</div> }));
vi.mock('@pages/favorites-pages/favorites-page', () => ({ default: () => <div>FavoritesPage</div> }));
vi.mock('@pages/offer-pages/offer-page', () => ({ default: () => <div>OfferPage</div> }));
vi.mock('@pages/not-found-page/not-found-page', () => ({ default: () => <div>NotFoundPage</div> }));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter initialEntries={mockInitialEntries}>{children}</MemoryRouter>
    ),
  };
});

describe('App routing', () => {
  it('Should render MainPage for /', () => {
    mockInitialEntries = ['/'];
    render(<App />);
    expect(screen.getByText('MainPage')).toBeInTheDocument();
  });

  it('Should render LoginPage for /login', () => {
    mockInitialEntries = ['/login'];
    render(<App />);
    expect(screen.getByText('LoginPage')).toBeInTheDocument();
  });

  it('Should render NotFoundPage for unknown route', () => {
    mockInitialEntries = ['/unknown'];
    render(<App />);
    expect(screen.getByText('NotFoundPage')).toBeInTheDocument();
  });
});
