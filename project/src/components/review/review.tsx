import { Review } from '../../types/offer';
import { calcRating, formatDate, formatDatetoIso } from '../../utils';

type ReviewComponentProps = {
  review: Review;
}

function ReviewComponent(props: ReviewComponentProps) {
  const { review } = props;

  return (
    <li className='reviews__item' key={review.id}>
      <div className='reviews__user user'>
        <div className='reviews__avatar-wrapper user__avatar-wrapper'>
          <img className='reviews__avatar user__avatar' src={review.user.avatarUrl} width={54} height={54} alt='Reviews avatar' />
        </div>
        <span className='reviews__user-name'>
          {review.user.name}
        </span>
      </div>
      <div className='reviews__info'>
        <div className='reviews__rating rating'>
          <div className='reviews__stars rating__stars'>
            <span style={{ width: calcRating(review.rating) }} />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <p className='reviews__text'>
          {review.comment}
        </p>
        <time className='reviews__time' dateTime={formatDatetoIso(review.date)}>{formatDate(review.date)}</time>
      </div>
    </li>
  );
}

export default ReviewComponent;
