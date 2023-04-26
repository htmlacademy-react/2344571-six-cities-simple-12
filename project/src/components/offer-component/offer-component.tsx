import { Offers } from '../../types/offers';
import Gallery from '../gallery';
import RoomInfo from '../room-info';
import Map from '../map';
import NearestOffers from '../nearest-offers';
import { Comment } from '../../types/comments';
import { COUNT_NEAR_OFFER } from '../../constants/constants';
import { CityLocation } from '../../mocks/offers';
import LoadingScreen from '../loading-screen';
import { AuthorizationStatus } from '../../constants/enum';

const OfferComponent = ({
  authorizationStatus,
  room,
  comments,
  nearOtherOffers,
  offerId,
  offersNearbyLoading,
  reviewLoaing,
}: {
  room: Offers;
  authorizationStatus: AuthorizationStatus;
  comments: Comment[];
  nearOtherOffers: Offers[];
  offerId: number;
  offersNearbyLoading: boolean;
  reviewLoaing: boolean;
}) => (
  <main className="page__main page__main--property" >
    <section className="property">
      <Gallery room={room} />
      <RoomInfo
        room={room}
        comments={comments}
        authorizationStatus={authorizationStatus}
        offerId={offerId}
        reviewLoaing={reviewLoaing}
      />
      <Map
        className="property__map"
        city={CityLocation}
        offers={[room, ...nearOtherOffers.slice(0, COUNT_NEAR_OFFER)]}
        selectedOfferId={room.id}
      />
    </section>
    {offersNearbyLoading ? <LoadingScreen /> : <NearestOffers offers={nearOtherOffers} />}
  </main >
);

export default OfferComponent;
