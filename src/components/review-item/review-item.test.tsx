import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReviewItem from './review-item';
import { makeReview } from '@test/mock';

describe('Component: ReviewItem', () => {
  it('Should render review content', () => {
    const review = makeReview({
      comment: 'Amazing!',
      user: { ...makeReview().user, name: 'Bob', isPro: true },
    });

    render(
      <ul>
        <ReviewItem review={review} />
      </ul>
    );

    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Amazing!')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
  });
});
