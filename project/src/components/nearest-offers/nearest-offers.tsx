import CardList from '../card-list';
import { COUNT_NEAR_OFFER } from '../../constants/constants';
import { Offers } from '../../types/offers';

const NearestOffers = ({ offers }: { offers: Offers[] }) => (
  <div className="container">
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        <CardList
          offers={offers.slice(0, COUNT_NEAR_OFFER)}
          cardType="property"
        />
      </div>
    </section>
  </div>
);

export default NearestOffers;
