import { Review } from '../../types/review';
import { getRatingColor } from '../../utils/getRatingColor';
import { humanizeDate } from '../../utils/humanizeDate';

type ReviewItemProps = {
  comment: Review['comment'];
  date: Review['date'];
  rating: Review['rating'];
  user: Review['user'];
}

const ReviewItem = ({ comment, date, rating, user }: ReviewItemProps) => {
  const { avatarUrl, name, isPro } = user;
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt={user.name} />
          <span className="property__user-status">{isPro}</span>
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${getRatingColor(rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={humanizeDate(date, 'YYYY-MM-DD')}>{humanizeDate(date, 'MMMM YYYY')}</time>
      </div>
    </li>
  );
};

export default ReviewItem;
