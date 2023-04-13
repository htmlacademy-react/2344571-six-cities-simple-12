import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import OfferImageWrapper from '../../components/OfferImageWrapper/OfferImageWrapper';
import OfferInsideItem from '../../components/OfferInsideItem/OfferInsideItem';
import Review from '../../components/Review/Review';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import PlaceCard from '../../components/PlaceCard/PlaceCard';
import Map from '../../components/Map/Map';
import { useAppSelector } from '../../hooks';

const Neighbourhoods = 3;

function Room(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const reviews = useAppSelector((state) => state.reviews);

  const params = useParams();
  const offerId = Number(params.id);
  const currentOffer = offers.filter((offer) => offer.id === offerId)[0];
  const { images, title, isPremium, rating, price, type, bedrooms, maxAdults, goods, host, description, } = currentOffer;

  const closeOffers = offers
    .filter((offer) => offer.city.name === currentOffer.city.name)
    .filter((offer) => offer.id !== currentOffer.id)
    .slice(0, Neighbourhoods);

  return (
    <><Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((src) => <OfferImageWrapper src={src} offer={currentOffer} key={src} />)}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && <div className="property__mark"> <span>Premium</span> </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${rating * 20}%` }}></span>
                  <span className="visually-hidden">{rating}</span>
                </div>
                <span className="property__rating-value rating__value">4.8</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
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
                  {reviews.map((review) => <Review review={review} key={review.id} />)}
                </ul>
                <ReviewForm/>
              </section>
            </div>
          </div>
          <Map
            cityInfo={currentOffer.city}
            points={closeOffers}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {closeOffers.map((offer) => (<PlaceCard offer={offer} key={offer.id} />))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Room;
