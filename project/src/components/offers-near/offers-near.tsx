import { Offers } from '../../types/offer';
import CardComponent from '../card/card';

type OffersListNearComponentProps = {
  offers: Offers;
  setActiveOffer: (id: number | null) => void;
}

function OffersListNearComponent(props: OffersListNearComponentProps): JSX.Element {
  const { offers, setActiveOffer } = props;
  return (
    <>
      {
        offers.map((offer) => <CardComponent key={offer.id} offer={offer} setActiveOffer={setActiveOffer} />)
      }
    </>
  );
}

export default OffersListNearComponent;
