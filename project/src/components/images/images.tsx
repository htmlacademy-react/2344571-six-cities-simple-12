type ImagesComponentProps = {
  link: string;
}

function ImagesComponent({ link }: ImagesComponentProps): JSX.Element {
  return (
    <div className='property__image-wrapper'>
      <img
        className='property__image'
        src={link}
        alt=''
      />
    </div>
  );
}

export default ImagesComponent;
