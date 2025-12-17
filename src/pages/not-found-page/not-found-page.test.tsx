import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import NotFoundPage from './not-found-page';

describe('Page: NotFoundPage', () => {
  it('Should render 404 and link to main', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /return to main page/i })).toBeInTheDocument();
  });
});
