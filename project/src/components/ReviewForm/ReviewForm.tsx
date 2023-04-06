import React, { SyntheticEvent, useState } from 'react';

function ReviewForm(): JSX.Element {
  const [formValue, setFormValue] = useState({
    rating: 0,
    review: '',
  });

  const stars = [
    {
      value: 5,
      title: 'perfect',
    },
    {
      value: 4,
      title: 'good'
    },
    {
      value: 3,
      title: 'not bad'
    },
    {
      value: 2,
      title: 'badly'
    },
    {
      value: 1,
      title: 'terribly'
    },
  ];

  const onChange = (event: SyntheticEvent): void => {
    const target = event.target as HTMLTextAreaElement;

    const name = target.name;

    setFormValue({
      ...formValue,
      [name]: target.value
    });
  };

  const onRatingChange = (star: typeof stars[0]): void => {
    setFormValue({
      ...formValue,
      rating: star.value,
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {stars.map((star) => (
          <React.Fragment key={star.value}>
            <input className="form__rating-input visually-hidden" name="rating" value={star.value} id={`${star.value}-stars`} type="radio" onInput={() => onRatingChange(star)} />
            <label htmlFor={`${star.value}-stars`} className="reviews__rating-label form__rating-label" title={star.title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" onInput={onChange} />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
					To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}


export default ReviewForm;
