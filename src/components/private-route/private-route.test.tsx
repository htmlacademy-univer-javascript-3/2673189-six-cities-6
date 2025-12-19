import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import PrivateRoute from './private-route';
import { AuthStatus, AppRoute } from '@consts/consts';

describe('Component: PrivateRoute', () => {
  it('Should render children for AUTH user', () => {
    render(
      <MemoryRouter>
        <PrivateRoute authorizationStatus={AuthStatus.AUTH}>
          <div>Private content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Private content')).toBeInTheDocument();
  });

  it('Should redirect to /login for NOAUTH user', () => {
    render(
      <MemoryRouter initialEntries={[AppRoute.FAVORITES]}>
        <PrivateRoute authorizationStatus={AuthStatus.NOAUTH}>
          <div>Private content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText('Private content')).not.toBeInTheDocument();
  });
});
