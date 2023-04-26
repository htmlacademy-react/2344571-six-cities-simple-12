import { useState, ChangeEvent, FormEvent } from 'react';
import ReviewFormInput from '../ReviewFormInput/ReviewFromInput';
import { useAppDispatch } from '../../hooks';
import { postReviewAction } from '../../store/api-actions';
import { ReviewDataType } from '../../types/reviews';

const Stars = ['5', '4', '3', '2', '1'];

const minLength = 50;
const maxLength = 300;

type FormReviewProps = {
	offerId: number;
}

const ReviewForm = ({ offerId }: FormReviewProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    rating: '',
    review: '',
    isValid: false,
  });

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    const isValid = value.length >= minLength && value.length <= maxLength;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      isValid,
    }));
  };

  const onSubmit = (reviewData: ReviewDataType) => {
    dispatch(postReviewAction(reviewData));
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    onSubmit({
      id: offerId,
      rating: Number(formData.rating),
      comment: formData.review,
    });

    setFormData({
      rating: '',
      review: '',
      isValid: false,
    });
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Stars.map((star) => <ReviewFormInput rating={formData.rating} value={star} key={star} onChange={handleInputChange} />)}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleInputChange}
        value={formData.review}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
					To submit review please make sure to set <span className="reviews__star">rating</span> and describe
					your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!formData.review || !formData.rating || !formData.isValid}
        >
					Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
