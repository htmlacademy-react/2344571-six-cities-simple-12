import { CityLocation, Offers } from '../../types/offers';
import CardList from '../card-list';
import SortPlaces from '../sort-places';
import Map from '../map';
import { SortingTypes } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { offerIdChange } from '../../store/offer-process/offer-process';

type MainPageContent = {
  placesCount: number;
  offers: Offers[];
  currentCity: string;
  currentSortName: SortingTypes;
};

const MainPageContent = ({ placesCount, currentCity, offers, currentSortName }: MainPageContent) => {
  const dispatch = useAppDispatch();
  const offersId = useAppSelector((state) => state.OFFER.id);

  const onListItemHover = (id: number) => {
    dispatch(offerIdChange(id));
  };

  const onMouseLeave = () => {
    dispatch(offerIdChange(null));
  };

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{placesCount} places to stay in {currentCity}</b>
          <SortPlaces currentSortName={currentSortName} />
          <div className="cities__places-list places__list tabs__content">
            <CardList
              offers={offers}
              cardType={'home'}
              onListItemHover={onListItemHover}
              onMouseLeave={onMouseLeave}
            />
          </div>
        </section>
        <div className="cities__right-section">
          <Map
            className="cities__map"
            city={CityLocation}
            offers={offers}
            selectedOfferId={offersId}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPageContent;
