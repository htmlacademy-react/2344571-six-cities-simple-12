import { AuthorizationStatus } from '../../constants/enum';
import PropertyItem from '../../pages/property-item';
import { Offers } from '../../types/offers';
import { getRatingColor } from '../../utils/getRatingColor';
import Badge from '../badge';
import LoadingScreen from '../loading-screen';
import PropertyDescription from '../property-description';
import ReviewForm from '../review-form';
import ReviewList from '../review-list';
import { Comment } from '../../types/comments';

const RoomInfo = ({ room, comments, authorizationStatus, offerId, reviewLoaing }: {
  room: Offers;
  authorizationStatus: AuthorizationStatus;
  comments: Comment[];
  offerId: number;
  reviewLoaing: boolean;
}) => (
  <div className="property__container container">
    <div className="property__wrapper">
      {room.isPremium && <Badge className="property__mark" />}
      <div className="property__name-wrapper">
        <h1 className="property__name">
          {room.title}
        </h1>
      </div>
      <div className="property__rating rating">
        <div className="property__stars rating__stars">
          <span style={{ width: `${getRatingColor(room.rating)}%` }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="property__rating-value rating__value">{room.rating}</span>
      </div>
      <ul className="property__features">
        <li className="property__feature property__feature--entire">
          {room.type.replace(room.type[0], room.type[0].toUpperCase())}
        </li>
        <li className="property__feature property__feature--bedrooms">
          {room.bedrooms} Bedrooms
        </li>
        <li className="property__feature property__feature--adults">
          Max {room.maxAdults} adults
        </li>
      </ul>
      <div className="property__price">
        <b className="property__price-value">&euro;{room.price}</b>
        <span className="property__price-text">&nbsp;night</span>
      </div>
      <div className="property__inside">
        <h2 className="property__inside-title">What&apos;s inside</h2>
        <ul className="property__inside-list">
          {room.goods.map((item) => (
            <PropertyItem key={item} item={item} />
          ))}
        </ul>
      </div>
      <div className="property__host">
        <h2 className="property__host-title">Meet the host</h2>
        <div className="property__host-user user">
          <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
            <img className="property__avatar user__avatar" src={room.host.avatarUrl} width="74" height="74" alt="Host avatar" />
          </div>
          <span className="property__user-name">
            {room.host.name}
          </span>
          {room.host.isPro && <span className="property__user-status">Pro</span>}
        </div>
        <div className="property__description">
          <PropertyDescription description={room.description} />
        </div>
      </div>
      <section className="property__reviews reviews">
        {reviewLoaing ? <LoadingScreen /> : <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>}
        {reviewLoaing ? <LoadingScreen /> : <ReviewList comments={comments} />}
        {authorizationStatus === AuthorizationStatus.Auth ? <ReviewForm offerId={offerId} /> : null}
      </section>
    </div>
  </div>
);

export default RoomInfo;
