import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ReviewForm from './review-form';

const dispatchMock = vi.fn(() => Promise.resolve({ type: 'any' }));

vi.mock('@hooks/dispatch', () => ({
  useAppDispatch: () => dispatchMock,
  useAppSelector: (selector: unknown) => {
    if (typeof selector === 'function') {
      return false;
    }
    return undefined;
  },
}));

vi.mock('@store/reviews-data/reviews-data.selectors', () => ({
  selectIsReviewPosting: () => false,
}));

vi.mock('@store/app-data/app-data.selectors', () => ({
  selectError: () => null,
}));

vi.mock('@store/api-action', () => ({
  postReviewAction: Object.assign(
    (payload: unknown) => ({ type: 'api/postReview', payload }),
    {
      fulfilled: { match: () => false },
    }
  ),
}));

describe('Component: ReviewForm', () => {
  beforeEach(() => {
    dispatchMock.mockClear();
  });

  it('Should keep submit disabled until rating and valid comment are provided', async () => {
    const user = userEvent.setup();
    const { container } = render(<ReviewForm offerId="1" />);

    const submit = screen.getByRole('button', { name: 'Submit' });
    expect(submit).toBeDisabled();

    await user.type(screen.getByRole('textbox'), 'a'.repeat(50));
    expect(submit).toBeDisabled();
    const perfectLabel = container.querySelector('label[title="perfect"]');
    expect(perfectLabel).not.toBeNull();
    await user.click(perfectLabel as HTMLElement);

    expect(submit).not.toBeDisabled();
  });

  it('Should dispatch postReviewAction on submit when form is valid', async () => {
    const user = userEvent.setup();
    const { container } = render(<ReviewForm offerId="10" />);

    await user.type(screen.getByRole('textbox'), 'Great place '.repeat(6));

    const goodLabel = container.querySelector('label[title="good"]');
    expect(goodLabel).not.toBeNull();
    await user.click(goodLabel as HTMLElement);

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(dispatchMock).toHaveBeenCalled();

    const calls = (vi.mocked(dispatchMock).mock.calls as unknown[][]);
    const firstCallArg = calls[0]?.[0];
    expect(firstCallArg).toBeDefined();

    const dispatchedAction = firstCallArg as { type: string; payload: unknown };
    expect(dispatchedAction.type).toBe('api/postReview');

    const payload = dispatchedAction.payload as { offerId: string; rating: number; comment: string };
    expect(payload.offerId).toBe('10');
    expect(payload.rating).toBe(4);
    expect(payload.comment.length).toBeGreaterThanOrEqual(50);
  });
});
