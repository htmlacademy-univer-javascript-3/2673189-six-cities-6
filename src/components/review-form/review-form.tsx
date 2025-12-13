import React from 'react';
import RatingInput from './rating-input';
import { useAppDispatch, useAppSelector } from '@hooks/dispatch';
import { fetchReviewsByOfferIdAction, postReviewAction } from '@store/api-action';

type ReviewFormProps = {
  offerId: string;
};

export default function ReviewForm({ offerId }: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isPosting = useAppSelector((state) => state.isReviewPosting);
  const error = useAppSelector((state) => state.error);

  const [formData, setFormData] = React.useState({
    comment: '',
    rating: 0
  });

  const handleFieldChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;

    if (name === 'rating') {
      setFormData((prev) => ({ ...prev, rating: Number(value) }));
      return;
    }

    if (name === 'comment') {
      setFormData((prev) => ({ ...prev, comment: value }));
    }
  };

  const commentValue = formData.comment.trim();
  const isValid = formData.rating >= 1 && formData.rating <= 5 && commentValue.length >= 50 && commentValue.length <= 300;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();

    if (!isValid || isPosting) {
      return;
    }

    void (async () => {
      const action = await dispatch(
        postReviewAction({ offerId, comment: commentValue, rating: formData.rating })
      );

      if (postReviewAction.fulfilled.match(action) && action.payload) {
        setFormData({ comment: '', rating: 0 });
        // Ensure the new review appears in the list
        await dispatch(fetchReviewsByOfferIdAction(offerId));
      }
    })();
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <fieldset className="reviews__fieldset" disabled={isPosting} style={{ border: 0, padding: 0, margin: 0 }}>
        <label className="reviews__label form__label" htmlFor="comment">Your review</label>

        <div className="reviews__rating-form form__rating">
          <RatingInput value={5} title="perfect" onChange={handleFieldChange as React.ChangeEventHandler<HTMLInputElement>} checked={formData.rating === 5} />
          <RatingInput value={4} title="good" onChange={handleFieldChange as React.ChangeEventHandler<HTMLInputElement>} checked={formData.rating === 4} />
          <RatingInput value={3} title="not bad" onChange={handleFieldChange as React.ChangeEventHandler<HTMLInputElement>} checked={formData.rating === 3} />
          <RatingInput value={2} title="badly" onChange={handleFieldChange as React.ChangeEventHandler<HTMLInputElement>} checked={formData.rating === 2} />
          <RatingInput value={1} title="terribly" onChange={handleFieldChange as React.ChangeEventHandler<HTMLInputElement>} checked={formData.rating === 1} />
        </div>

        <textarea
          className="reviews__textarea form__textarea"
          onChange={handleFieldChange}
          value={formData.comment}
          id="comment"
          name="comment"
          placeholder="Tell how was your stay, what you like and what can be improved"
        />

        {error ? (
          <p className="form__error" style={{ color: '#ff4d4f', margin: '8px 0' }}>{error}</p>
        ) : null}

        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={!isValid || isPosting}>
            Submit
          </button>
        </div>
      </fieldset>
    </form>
  );
}
