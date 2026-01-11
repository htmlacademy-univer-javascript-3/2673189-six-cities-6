import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

import LoginPage from './login-page';
import { AuthStatus, AppRoute } from '@consts/consts';

const dispatchMock = vi.fn();

vi.mock('@components/header/header', () => ({
  default: () => <div data-testid="header" />,
}));

vi.mock('@store/app-process/app-process.slice', () => ({
  changeCity: (city: string) => ({ type: 'appProcess/changeCity', payload: city }),
}));

vi.mock('@hooks/dispatch', () => ({
  useAppDispatch: () => dispatchMock,
  useAppSelector: (selector?: unknown) => {
    if (typeof selector === 'function') {
      return null;
    }
    return AuthStatus.NOAUTH;
  },
}));

vi.mock('@store/api-action', () => ({
  loginAction: (payload: unknown) => ({ type: 'api/login', payload }),
}));

vi.spyOn(Math, 'random').mockReturnValue(0);

describe('Page: LoginPage', () => {
  beforeEach(() => {
    dispatchMock.mockClear();
  });

  it('Should render login form', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should dispatch loginAction on submit', async () => {
    const user = userEvent.setup();

    render(
      <HelmetProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    await user.type(screen.getByPlaceholderText('Email'), 'test@test.ru');
    await user.type(screen.getByPlaceholderText('Password'), 'abc123');

    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'api/login',
      payload: { login: 'test@test.ru', password: 'abc123' },
    });
  });

  it('Should change city and navigate to main on city click', async () => {
    const user = userEvent.setup();

    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[AppRoute.LOGIN]}>
          <LoginPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    const cityLink = screen.getByRole('link');
    await user.click(cityLink);

    expect(dispatchMock).toHaveBeenCalled();
    const calls: unknown[][] = dispatchMock.mock.calls as unknown[][];
    const first = calls.at(0);
    expect(first).toBeDefined();
    const action = (first as unknown[])[0] as { type: string; payload?: unknown };
    expect(action.type).toBe('appProcess/changeCity');
    expect(typeof action.payload).toBe('string');
    expect((action.payload as string).length).toBeGreaterThan(0);
  });

  it('Should not dispatch when password is invalid', async () => {
    const user = userEvent.setup();

    render(
      <HelmetProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    await user.type(screen.getByPlaceholderText('Email'), 'test@test.ru');
    await user.type(screen.getByPlaceholderText('Password'), 'p');

    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(dispatchMock).not.toHaveBeenCalled();
  });
});
