import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { getUppercase, calcRating } from '../../utils';
import { AppRoute } from '../../const';

type CardComponentProps = {
  offer: Offer;
  setActiveOffer: (id: number | null) => void;
}

function CardComponent({ offer, setActiveOffer }: CardComponentProps): JSX.Element {
  const { id } = offer;
  const offerId = `${id}`;

  return (
    <article className='cities__card place-card' onMouseEnter={(e) => setActiveOffer ? setActiveOffer(id) : e.stopPropagation()} onMouseOver={() => setActiveOffer(id)} onMouseLeave={() => setActiveOffer(null)}>
      <div className='place-card__mark'>
        <span>{offer.isPremium ? 'Premium' : 'Standart'}</span>
      </div>
      <div className='cities__image-wrapper place-card__image-wrapper'>
        <Link to={`${AppRoute.Room}/${offerId}`}>
          <img
            className='place-card__image'
            src={`${offer.previewImage}`}
            width={260}
            height={200}
            alt={offer.city.name}
          />
        </Link>
      </div>
      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>€{offer.price}</b>
            <span className='place-card__price-text'>/&nbsp;night</span>
          </div>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{ width: calcRating(offer.rating) }} />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link to={`${AppRoute.Room}/${offerId}`}>{offer.title}</Link>
        </h2>
        <p className='place-card__type'>{getUppercase(offer.type)}</p>
      </div>
    </article >
  );
}

export default CardComponent;
