import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SortOptions from './sort-options';
import { SortType } from '@consts/consts';

const dispatchMock = vi.fn();

vi.mock('@hooks/dispatch', () => ({
  useAppDispatch: () => dispatchMock,
  useAppSelector: (selector: unknown) => {
    if (typeof selector === 'function') {
      return SortType.Popular;
    }
    return undefined;
  },
}));

vi.mock('@store/app-process/app-process.slice', async () => {
  const actual = await vi.importActual<Record<string, unknown>>('@store/app-process/app-process.slice');
  return {
    ...actual,
    setSortType: (payload: SortType) => ({ type: 'appProcess/setSortType', payload }),
  };
});

describe('Component: SortOptions', () => {
  beforeEach(() => {
    dispatchMock.mockClear();
  });

  it('Should render current sort type', () => {
    render(<SortOptions />);
    expect(screen.getByText(SortType.Popular)).toBeInTheDocument();
  });

  it('Should open options on click and dispatch action on option click', async () => {
    const user = userEvent.setup();
    render(<SortOptions />);

    await user.click(screen.getByText(SortType.Popular));

    expect(screen.getByRole('list')).toBeInTheDocument();

    await user.click(screen.getByText(SortType.PriceLowToHigh));

    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'appProcess/setSortType',
      payload: SortType.PriceLowToHigh,
    });

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
