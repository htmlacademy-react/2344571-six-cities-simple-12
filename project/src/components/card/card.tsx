import { AppRoute } from '../../router/RoutePath';
import { Offers } from '../../types/offers';
import { Link, generatePath } from 'react-router-dom';
import { getRatingColor } from '../../utils/getRatingColor';

type CardProps = {
  price: Offers['price'];
  previewImage: Offers['previewImage'];
  title: Offers['title'];
  type: Offers['type'];
  isPremium: Offers['isPremium'];
  id: Offers['id'];
  rating: Offers['rating'];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  cardType: 'home' | 'property';
}

const cardClassnames = {
  home: {
    article: 'cities__card place-card',
    image: 'cities__image-wrapper place-card__image-wrapper',
    cardInfo: 'place-card__info',
  },

  property: {
    article: 'near-places__card place-card',
    image: 'near-places__image-wrapper place-card__image-wrapper',
    cardInfo: 'place-card__info',
  },
};

const getTypePlace = (type: string) => (
  type.replace(type[0], type[0].toUpperCase())
);

const Card = ({
  price, previewImage, title, type, isPremium, id, rating, onMouseEnter, cardType, onMouseLeave
}: CardProps) => {
  const { article, image, cardInfo } = cardClassnames[cardType];
  const typePlace = getTypePlace(type);

  const link = generatePath(AppRoute.Offer, {
    id: `${id}`,
  });

  return (
    <article
      className={article}
      onMouseOver={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={isPremium ? 'place-card__mark' : ''}>
        <span>{isPremium ? 'Premium' : ''}</span>
      </div>
      <div className={image}>
        <Link to={link}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={title} />
        </Link>
      </div>
      <div className={cardInfo}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${getRatingColor(rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={link}>{title}</Link>
        </h2>
        <p className="place-card__type">{typePlace}</p>
      </div>
    </article >
  );
};

export default Card;
