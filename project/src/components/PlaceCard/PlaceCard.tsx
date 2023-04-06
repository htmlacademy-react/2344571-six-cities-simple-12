import { OfferType } from '../../types/offers';
import { Link, generatePath } from 'react-router-dom';
import ButtonBookmark from '../ButtonBookmark/ButtonBookmark';

type OfferCardProps = {
	offer: OfferType;
	onOfferMouseOver?: (id: number) => void;
	onOfferMouseLeave?: () => void;
}

function PlaceCard({ offer, onOfferMouseOver, onOfferMouseLeave }:OfferCardProps): JSX.Element {
  const { id, isFavorite, isPremium, previewImage, price, rating, title, type } = offer;
  return (
    <article className="cities__card place-card"
		  onMouseOver={() => onOfferMouseOver?.(id)}
		  onMouseLeave={() => onOfferMouseLeave?.()}
    >
      <div className="cities__image-wrapper place-card__image-wrapper">
        {isPremium &&
			<div className="place-card__mark">
			  <span>Premium</span>
			</div>}
        <Link to={generatePath('/offer/:id', { id: `${id}` })}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt={title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <ButtonBookmark isFavorite={isFavorite} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating * 20}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath('/offer/:id', { id: `${id}` })}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article >
  );
}

export default PlaceCard;
