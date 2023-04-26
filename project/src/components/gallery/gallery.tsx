import { Offers } from '../../types/offers';
import ImagesOfOffers from '../images-of-offers';
import { MAX_PHOTOS_AMOUNT } from './constants';

const Gallery = ({ room }: { room: Offers }) => (
  <div className="property__gallery-container container">
    <div className="property__gallery">
      {room.images.slice(0, MAX_PHOTOS_AMOUNT).map((img) => (<ImagesOfOffers key={img} img={img} />))}
    </div>
  </div>
);

export default Gallery;
