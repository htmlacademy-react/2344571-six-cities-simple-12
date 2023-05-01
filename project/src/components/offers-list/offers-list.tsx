import { memo } from 'react';
import { Offers } from '../../types/offer';
import CardComponent from '../card/card';

type OffersListComponentProps = {
  offers: Offers;
  setActiveOffer: (id: number | null) => void;
}

function OffersListComponent(props: OffersListComponentProps): JSX.Element {
  const { offers, setActiveOffer } = props;
  return (
    <div className='cities__places-list places__list tabs__content'>
      {
        offers.map((offer) => <CardComponent key={offer.id} offer={offer} setActiveOffer={setActiveOffer} />)
      }
    </div>
  );
}

export default memo(OffersListComponent);
