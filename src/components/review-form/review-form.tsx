import React from 'react';
import RatingInput from './rating-input';

export default function ReviewForm(): JSX.Element {
  const [formData, setFormData] = React.useState({
    review: '',
    rating: 0
  });

  const handleFieldChange = (evt: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <RatingInput value={5} title="perfect" onChange={handleFieldChange as React.ChangeEventHandler<HTMLInputElement>} />
        <RatingInput value={4} title="good" onChange={handleFieldChange as React.ChangeEventHandler<HTMLInputElement>} />
        <RatingInput value={3} title="not bad" onChange={handleFieldChange as React.ChangeEventHandler<HTMLInputElement>} />
        <RatingInput value={2} title="badly" onChange={handleFieldChange as React.ChangeEventHandler<HTMLInputElement>} />
        <RatingInput value={1} title="terribly" onChange={handleFieldChange as React.ChangeEventHandler<HTMLInputElement>} />
      </div>
      <textarea className="reviews__textarea form__textarea" onChange={handleFieldChange} value={formData.review} id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"/>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}
