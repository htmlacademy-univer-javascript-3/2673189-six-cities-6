import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import MainEmpty from './main-empty';

vi.mock('@components/cities-list/cities-list', () => ({
  default: () => <div data-testid="cities-list" />,
}));

vi.mock('@hooks/dispatch', () => ({
  useAppSelector: () => 'Paris',
}));

describe('component: MainEmpty', () => {
  it('Should render empty message with current city', () => {
    render(<MainEmpty />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(/in Paris/i)).toBeInTheDocument();
    expect(screen.getByTestId('cities-list')).toBeInTheDocument();
  });
});
