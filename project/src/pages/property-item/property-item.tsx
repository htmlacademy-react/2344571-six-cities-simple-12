type PropertyItemProps = {
  item: string;
};

const PropertyItem = ({ item }: PropertyItemProps) => (
  <li className="property__inside-item">{item}</li>
);

export default PropertyItem;
