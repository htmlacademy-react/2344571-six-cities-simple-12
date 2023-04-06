import { OfferType } from '../../types/offers';

type OfferImageWrapperProps = {
	src: string;
	offer: OfferType;
}

function OfferImageWrapper({ src, offer }: OfferImageWrapperProps): JSX.Element {
  return (
    <div className="property__image-wrapper">
      <img className="property__image" src={src} alt={offer.title} />
    </div>
  );
}

export default OfferImageWrapper;
