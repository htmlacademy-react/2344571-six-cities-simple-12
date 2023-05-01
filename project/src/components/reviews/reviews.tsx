import { useEffect } from 'react';
import { fetchReviewAction } from '../../store/api-actions';
import { OfferId } from '../../types/offer';
import ReviewComponent from '../review/review';
import { useAppDispatch, useAppSelector } from '../../hooks/store';

type ReviewsComponentProps = {
  offerId: OfferId;
}

function ReviewsComponent(props: ReviewsComponentProps) {
  const { offerId } = props;
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviewAction(offerId));
  }, [offerId, dispatch]);


  return (
    <>
      <h2 className='reviews__title'>Reviews · <span className='reviews__amount'>{reviews.length}</span></h2>
      <ul className='reviews__list'>
        {
          reviews
          &&
          reviews.length > 0
          &&
          reviews.map((review) => (
            <ReviewComponent review={review} key={review.id} />
          )).reverse()
        }
      </ul>
    </>
  );
}

export default ReviewsComponent;
