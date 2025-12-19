import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CitiesList from './cities-list';

const dispatchMock = vi.fn();

vi.mock('@hooks/dispatch', () => ({
  useAppDispatch: () => dispatchMock,
}));

vi.mock('@store/app-process/app-process.slice', () => ({
  changeCity: (payload: string) => ({ type: 'appProcess/changeCity', payload }),
}));

describe('component: CitiesList', () => {
  beforeEach(() => {
    dispatchMock.mockClear();
  });

  it('should render city names', () => {
    render(
      <CitiesList
        cities={[
          { id: 1, name: 'Paris' },
          { id: 2, name: 'Amsterdam' },
        ]}
      />
    );

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
  });

  it('should dispatch changeCity on click', async () => {
    const user = userEvent.setup();

    render(
      <CitiesList
        cities={[
          { id: 1, name: 'Paris' },
          { id: 2, name: 'Amsterdam' },
        ]}
      />
    );

    await user.click(screen.getByText('Amsterdam'));

    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'appProcess/changeCity',
      payload: 'Amsterdam',
    });
  });
});
