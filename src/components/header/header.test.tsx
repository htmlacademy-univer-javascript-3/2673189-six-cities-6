import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import Header from './header';
import { AuthStatus, AppRoute, NameSpace } from '@consts/consts';
import { makeOffer, makeUser } from '@test/mock';

const dispatchMock = vi.fn();

let currentAuthStatus: AuthStatus = AuthStatus.NOAUTH;
let currentUser = makeUser({ email: 'user@test.ru' });
let currentOffers = [makeOffer({ isFavorite: true }), makeOffer({ id: '2', isFavorite: false })];

vi.mock('@hooks/dispatch', () => ({
  useAppDispatch: () => dispatchMock,
  useAppSelector: (selector: unknown) => {
    if (typeof selector !== 'function') {
      return undefined;
    }

    const fakeState = {
      [NameSpace.User]: { authorizationStatus: currentAuthStatus, user: currentUser },
      [NameSpace.Offers]: { offers: currentOffers, isOffersDataLoading: false },
      [NameSpace.AppProcess]: { city: 'Paris', sortType: 'Popular' },
    };

    return (selector as (s: unknown) => unknown)(fakeState);
  },
}));

vi.mock('@store/api-action', () => ({
  logoutAction: () => ({ type: 'api/logout' }),
}));

describe('Component: Header', () => {
  beforeEach(() => {
    dispatchMock.mockClear();
    currentAuthStatus = AuthStatus.NOAUTH;
    currentUser = makeUser({ email: 'user@test.ru' });
    currentOffers = [makeOffer({ isFavorite: true }), makeOffer({ id: '2', isFavorite: false })];
  });

  it('Should render Sign in link for unauthorized user', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign in/i })).toHaveAttribute('href', AppRoute.LOGIN);
  });

  it('Should render user email and favorites count for authorized user', () => {
    currentAuthStatus = AuthStatus.AUTH;

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('user@test.ru')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('Should dispatch logoutAction on Sign out click', async () => {
    currentAuthStatus = AuthStatus.AUTH;

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    await user.click(screen.getByText('Sign out'));

    expect(dispatchMock).toHaveBeenCalledWith({ type: 'api/logout' });
  });
});
