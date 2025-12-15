import ReviewItem from '@components/review-item/review-item';
import { Review } from '@types';

type ReviewsListProps = {
  reviews: Review[] | undefined;
};

export default function ReviewsList({ reviews }: ReviewsListProps): JSX.Element {
  const sortedReviews = reviews
    ? [...reviews]
      .sort((a, b) => {
        const aTime = new Date(a.date).getTime();
        const bTime = new Date(b.date).getTime();

        const safeATime = Number.isNaN(aTime) ? 0 : aTime;
        const safeBTime = Number.isNaN(bTime) ? 0 : bTime;

        return safeBTime - safeATime;
      })
      .slice(0, 10)
    : [];

  return (
    <div>
      {sortedReviews.length > 0 ? (
        <ul className="reviews__list">
          {sortedReviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: 'center', fontSize: '32px' }}>No reviews available</p>
      )}
    </div>
  );
}
