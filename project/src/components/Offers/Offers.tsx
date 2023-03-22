//import { useState } from 'react';
import { Offer } from '../../types/offer';
import OfferCard from '../OfferCard/OfferCard';

interface Props {
  offers: Offer[];
}

function Offers({ offers }: Props): JSX.Element {
  // const [selectOffer, setSelectOffer] = useState(null);

  return <div>{offers.map((offer) => (<OfferCard offer={offer} key={offer.id} />))}</div>;
}

export default Offers;
