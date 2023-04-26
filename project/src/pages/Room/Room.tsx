import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import OfferImageWrapper from '../../components/OfferImageWrapper/OfferImageWrapper';
import OfferInsideItem from '../../components/OfferInsideItem/OfferInsideItem';
import Review from '../../components/Review/Review';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import PlaceCard from '../../components/PlaceCard/PlaceCard';
import Map from '../../components/Map/Map';
import { useAppSelector, useAppDispatch } from '../../hooks';
import HeaderNav from '../../components/HeaderNav/HeaderNav';
import { ReviewsType } from '../../types/reviews';
import { useEffect } from 'react';
import {
  fetchActiveOfferAction,
  fetchReviewsAction,
  fetchNeighbourhoodAction,
} from '../../store/api-actions';
import cn from 'classnames';
import { Type, AuthorizationStatus } from '../../constants';
import Loader from '../../components/loader/loader';

const neighbourhoods = 3;
const numberOfReviews = 10;
const numberOfImages = 6;

const prepareReviews = (reviews: ReviewsType) => {
  if (reviews.length <= 1) {
    return reviews;
  }
  return [...reviews]
    .sort((reviewA, reviewB) => Date.parse(reviewB.date) - Date.parse(reviewA.date))
    .slice(0, numberOfReviews);
};

function Room(): JSX.Element {
  const reviews = useAppSelector((state) => state.reviews);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOfferLoaded = useAppSelector((state) => state.isOfferLoaded);
  const currentOffer = useAppSelector((state) => state.activeOffer);
  const neighbourhood = useAppSelector((state) => state.neighbourhood).slice(0, neighbourhoods);

  const params = useParams();
  const offerId = Number(params.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchActiveOfferAction(offerId));
    dispatch(fetchNeighbourhoodAction(offerId));
    dispatch(fetchReviewsAction(offerId));
  }, [offerId, dispatch]);

  if (currentOffer === null || isOfferLoaded) {
    return (
      <Loader />
    );
  }

  const {
    images,
    title,
    isPremium,
    rating,
    price,
    isFavorite,
    type,
    bedrooms,
    maxAdults,
    goods,
    host,
    description,
  } = currentOffer;

  const btnBookmarkClassName = cn('property__bookmark-button button', {
    'property__bookmark-button--active': isFavorite,
  });

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <>
      <Header>
        <HeaderNav />
      </Header>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0, numberOfImages).map((src) => <OfferImageWrapper src={src} offer={currentOffer} key={src} />)}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && <div className="property__mark"> <span>Premium</span> </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button
                  className={btnBookmarkClassName}
                  type="button"
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${rating * 20}%` }}></span>
                  <span className="visually-hidden">{rating}</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {Type[type]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
									Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((item) => <OfferInsideItem item={item} key={Math.random()} />)}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt={host.name} />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  <span className="property__user-status">
                    {host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ul className="reviews__list">
                  {prepareReviews(reviews).map((review) => <Review review={review} key={review.id} />)}
                </ul>
                {isAuth && <ReviewForm offerId={offerId} />}
              </section>
            </div>
          </div>
          <Map cityInfo={currentOffer.city} points={[currentOffer, ...neighbourhood]} activeOfferID={offerId} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {neighbourhood.map((offer) => <PlaceCard offer={offer} key={offer.id} />)}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Room;
