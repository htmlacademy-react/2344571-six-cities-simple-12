import PlaceCard from '../PlaceCard/PlaceCard';
import { OffersType } from '../../types/offers';

type OffersListProps = {
	offers: OffersType;
	onOfferMouseOver?: (id: number) => void;
	onOfferMouseLeave?: () => void;
}

function Offers({ offers, onOfferMouseOver, onOfferMouseLeave }: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onOfferMouseOver={onOfferMouseOver}
          onOfferMouseLeave={onOfferMouseLeave}
        />
      ))}
    </div>
  );
}

export default Offers;
