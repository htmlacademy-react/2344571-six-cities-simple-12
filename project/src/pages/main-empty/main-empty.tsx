import { useAppSelector } from '../../hooks/store';

type MainScreenEmptyProps = {
  cityName: string;
}

function MainScreenEmpty(props: MainScreenEmptyProps): JSX.Element {
  const { cityName } = props;
  const isOfferLoading: boolean = useAppSelector((state) => state.isOfferLoading);

  return (
    <div className="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          {!isOfferLoading &&
            <>
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property available at the moment in {cityName}</p>
            </>}
          {isOfferLoading && <b className="cities__status">No connection to the server</b>}
        </div>
      </section>
      <div
        className="cities__right-section"
        style={{
          backgroundImage: 'url(img/no-places@2x.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'auto 119%',
          backgroundPosition: 'right 100%',
        }}
      >
      </div>
    </div>
  );
}

export default MainScreenEmpty;
