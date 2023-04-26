import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Offers } from '../../types/offers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import NotFound from '../not-found';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { fetchCommentsAction } from '../../store/comments-process/api-actionts';
import { fetchNearOffersAction } from '../../store/near-offers-process/api-actions';
import { fetchOfferByIdAction } from '../../store/offer-process/api-actions';
import LoadingScreen from '../../components/loading-screen';
import { getOffersNearbyLoading } from '../../store/near-offers-process/selectors';
import { getReviewsLoading } from '../../store/comments-process/selectors';
import OfferComponent from '../../components/offer-component';

const Offer = () => {
  const { id } = useParams();
  const offerId = Number(id);
  const dispatch = useAppDispatch();

  const [room, setRoom] = useState<Offers>();

  const offers = useAppSelector((state) => state.OFFER.offers);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const comments = useAppSelector((state) => state.COMMENT.loadComments);
  const nearOffers = useAppSelector((state) => state.NEAR_OFFERS.nearOffers);
  const offersNearbyLoading = useAppSelector(getOffersNearbyLoading);
  const reviewLoaing = useAppSelector(getReviewsLoading);

  useEffect(() => {
    setRoom(offers.find((offer) => offer.id === offerId));
    dispatch(fetchCommentsAction({ id: offerId }));
    dispatch(fetchNearOffersAction(offerId));
    dispatch(fetchOfferByIdAction({ id: offerId }));
  }, [offerId, dispatch]);

  const offerError = offers.find((offer) => offer.id === offerId);

  if (!offerError) {
    return <NotFound />;
  }

  if (!room) {
    return <LoadingScreen />;
  }

  const otherOffers = nearOffers.filter((offer) => offer.id !== room.id);
  const nearOtherOffers = otherOffers.filter((offer) => offer.city.name === room.city.name);

  return (
    <OfferComponent
      room={room}
      authorizationStatus={authorizationStatus}
      comments={comments}
      nearOtherOffers={nearOtherOffers}
      offerId={offerId}
      offersNearbyLoading={offersNearbyLoading}
      reviewLoaing={reviewLoaing}
    />
  );
};

export default Offer;
