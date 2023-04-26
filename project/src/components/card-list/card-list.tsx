import Card from '../card';
import { Offers } from '../../types/offers';

type ListCardProps = {
  offers: Offers[];
  onListItemHover?: (id: number) => void;
  onMouseLeave?: () => void;
  cardType: 'home' | 'property';
};

const CardList = ({ offers, cardType, onListItemHover, onMouseLeave }: ListCardProps) => (
  <>
    {offers.map(({ price, previewImage, title, type, isPremium, id, rating }) => (
      <Card
        key={id}
        price={price}
        previewImage={previewImage}
        title={title}
        type={type}
        isPremium={isPremium}
        id={id}
        rating={rating}
        onMouseEnter={() => {onListItemHover?.(id);}}
        onMouseLeave={onMouseLeave}
        cardType={cardType}
      />
    ))}
  </>
);


export default CardList;
