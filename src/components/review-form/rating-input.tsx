import React from 'react';

type RatingInputProps = {
  value: number;
  title: string;
  name?: string;
  checked?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export default function RatingInput({ value, title, name = 'rating', checked, onChange }: RatingInputProps): JSX.Element {
  const id = `${value}-stars`;
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        onChange={onChange}
        name={name}
        value={value}
        id={id}
        type="radio"
        checked={checked}
      />
      <label htmlFor={id} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}
