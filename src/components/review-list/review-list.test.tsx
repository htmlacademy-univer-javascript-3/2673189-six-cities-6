import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReviewsList from './review-list';
import { makeReview } from '@test/mock';

describe('Component: ReviewsList', () => {
  it('Should render empty state when no reviews provided', () => {
    render(<ReviewsList reviews={undefined} />);
    expect(screen.getByText('No reviews available')).toBeInTheDocument();
  });

  it('Should render reviews list', () => {
    const reviews = [
      makeReview({ id: '1', comment: 'First', date: '2022-01-01T00:00:00.000Z' }),
      makeReview({ id: '2', comment: 'Second', date: '2023-01-01T00:00:00.000Z' }),
    ];

    render(<ReviewsList reviews={reviews} />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });
});
