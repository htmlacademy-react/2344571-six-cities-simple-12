type ImagesProps = {
  img: string;
};

const ImagesOfOffers = ({ img }: ImagesProps) => (
  <div className="property__image-wrapper">
    <img className="property__image" src={img} alt="Photo studio" />
  </div>
);

export default ImagesOfOffers;
