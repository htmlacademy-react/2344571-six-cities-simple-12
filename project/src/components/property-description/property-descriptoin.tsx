import { Offers } from '../../types/offers';

type DescriptionProps = {
  description: Offers['description'];
}

const PropertyDescription = ({ description }: DescriptionProps) => (
  <p className="property__text">{description}</p>
);


export default PropertyDescription;
