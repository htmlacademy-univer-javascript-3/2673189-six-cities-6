import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

import LoginPage from './login-page';
import { AuthStatus } from '@consts/consts';

const dispatchMock = vi.fn();

vi.mock('@components/header/header', () => ({
  default: () => <div data-testid="header" />,
}));

vi.mock('@hooks/dispatch', () => ({
  useAppDispatch: () => dispatchMock,
  useAppSelector: () => AuthStatus.NOAUTH,
}));

vi.mock('@store/api-action', () => ({
  loginAction: (payload: unknown) => ({ type: 'api/login', payload }),
}));

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
    await user.type(screen.getByPlaceholderText('Password'), '123456');

    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'api/login',
      payload: { login: 'test@test.ru', password: '123456' },
    });
  });
});
