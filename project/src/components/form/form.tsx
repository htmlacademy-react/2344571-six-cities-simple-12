import { useState, FormEvent, useEffect, useCallback } from 'react';
import { NewReview, OfferId } from '../../types/offer';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { addReviewAction, fetchReviewAction } from '../../store/api-actions';

type CommentFormComponentProps = {
  offerId: OfferId;
}

function CommentFormComponent(props: CommentFormComponentProps): JSX.Element {
  const { offerId } = props;
  const [formData, setFormData] = useState<NewReview>({ offerId: offerId, comment: '', rating: 0 });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();
  const reviewLoadingStatus = useAppSelector((state) => state.isReviewLoading);

  const isFormValid = useCallback(() => Number(formData.rating) > 0 && formData.comment.length >= 50 && formData.comment.length <= 300, [formData.comment.length, formData.rating]);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid()) {
      return;
    }
    try {
      setLoading(true);
      dispatch(addReviewAction(formData));
      event.currentTarget.reset();
      setFormData({ offerId: offerId, comment: '', rating: 0 });
    } catch (error) {
      setErrorMessage('Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => () => {
    dispatch(fetchReviewAction(offerId));
  }, [dispatch, offerId]);

  return (
    <form className='reviews__form form' action='#' method='post' onSubmit={handleSubmit}>
      <label className='reviews__label form__label' htmlFor='review'>Your review</label>
      <div className='reviews__rating-form form__rating'>
        <input className='form__rating-input visually-hidden' name='rating' defaultValue={5} id='5-stars' type='radio' onChange={handleInputChange} />
        <label htmlFor='5-stars' className='reviews__rating-label form__rating-label' title='perfect'>
          <svg className='form__star-image' width={37} height={33}>
            <use xlinkHref='#icon-star' />
          </svg>
        </label>
        <input className='form__rating-input visually-hidden' name='rating' defaultValue={4} id='4-stars' type='radio' onChange={handleInputChange} />
        <label htmlFor='4-stars' className='reviews__rating-label form__rating-label' title='good'>
          <svg className='form__star-image' width={37} height={33}>
            <use xlinkHref='#icon-star' />
          </svg>
        </label>
        <input className='form__rating-input visually-hidden' name='rating' defaultValue={3} id='3-stars' type='radio' onChange={handleInputChange} />
        <label htmlFor='3-stars' className='reviews__rating-label form__rating-label' title='not bad'>
          <svg className='form__star-image' width={37} height={33}>
            <use xlinkHref='#icon-star' />
          </svg>
        </label>
        <input className='form__rating-input visually-hidden' name='rating' defaultValue={2} id='2-stars' type='radio' onChange={handleInputChange} />
        <label htmlFor='2-stars' className='reviews__rating-label form__rating-label' title='badly'>
          <svg className='form__star-image' width={37} height={33}>
            <use xlinkHref='#icon-star' />
          </svg>
        </label>
        <input className='form__rating-input visually-hidden' name='rating' defaultValue={1} id='1-star' type='radio' onChange={handleInputChange} />
        <label htmlFor='1-star' className='reviews__rating-label form__rating-label' title='terribly'>
          <svg className='form__star-image' width={37} height={33}>
            <use xlinkHref='#icon-star' />
          </svg>
        </label>
      </div>
      <textarea className='reviews__textarea form__textarea' id='review' name='comment' placeholder='Tell how was your stay, what you like and what can be improved' defaultValue={''} onChange={handleInputChange} />
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set <span className='reviews__star'>rating</span> and describe your stay with at least <b className='reviews__text-amount'>50 characters</b>.
        </p>
        <button className='reviews__submit form__submit button' type='submit' disabled={!isFormValid() || loading || reviewLoadingStatus}>{loading ? 'Sending...' : 'Submit'}</button>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      </div>
    </form>
  );
}

export default CommentFormComponent;
