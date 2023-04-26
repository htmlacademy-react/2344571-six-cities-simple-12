import ReviewItem from '../review-item';
import { MAX_REVIEWS } from './constants';
import { Review } from '../../types/review';
import { Comment } from '../../types/comments';
import { useEffect, useState } from 'react';

type ReviewProps = {
  comments: Comment[];
}

const getReviewList = (review: Review[]) => {
  const items = [...review];

  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return items;
};

const ReviewList = ({ comments }: ReviewProps) => {
  const [currentReviews, setCurrentReviews] = useState<Review[]>([]);

  useEffect(() => {
    setCurrentReviews(comments);
  }, [comments]);

  return (
    <ul className="reviews__list">
      {getReviewList(currentReviews).slice(0, MAX_REVIEWS).map((review: Review) => (
        <ReviewItem key={review.id} comment={review.comment} date={review.date} rating={review.rating} user={review.user} />
      ))}
    </ul>
  );
};
export default ReviewList;
