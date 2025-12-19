import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import { CardType, AppRoute, AuthStatus } from '@consts/consts';
import { makeOffer } from '@test/mock';

const dispatchMock = vi.fn();
const navigateMock = vi.fn();

let currentAuthStatus: AuthStatus = AuthStatus.NOAUTH;

vi.mock('@hooks/dispatch', () => ({
  useAppDispatch: () => dispatchMock,
  useAppSelector: () => currentAuthStatus,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<Record<string, unknown>>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('@store/api-action', () => ({
  changeFavoriteStatusAction: (payload: unknown) => ({
    type: 'api/changeFavoriteStatus',
    payload,
    unwrap: () => Promise.resolve(),
  }),
  fetchFavoritesAction: () => ({ type: 'api/fetchFavorites' }),
}));

import PlaceCard from './place-card';

describe('Component: PlaceCard', () => {
  beforeEach(() => {
    dispatchMock.mockClear();
    navigateMock.mockClear();
    currentAuthStatus = AuthStatus.NOAUTH;
  });

  it('Should call navigate to login when user is not authorized and clicks bookmark', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <PlaceCard
          offer={makeOffer()}
          onMouse={() => {}}
          offMouse={() => {}}
          cardType={CardType.Regular}
        />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button'));

    expect(navigateMock).toHaveBeenCalledWith(AppRoute.LOGIN);
    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('Should dispatch favorite change and then fetchFavorites when authorized', async () => {
    currentAuthStatus = AuthStatus.AUTH;

    dispatchMock.mockImplementation((action: unknown) => {
      const maybeAction = action as { type?: string };
      if (maybeAction?.type === 'api/changeFavoriteStatus') {
        return { unwrap: () => Promise.resolve() };
      }
      return action;
    });

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <PlaceCard
          offer={makeOffer({ id: '10', isFavorite: false })}
          onMouse={() => {}}
          offMouse={() => {}}
          cardType={CardType.Regular}
        />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'api/changeFavoriteStatus' })
      );
    });

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'api/fetchFavorites' })
      );
    });
  });
});
