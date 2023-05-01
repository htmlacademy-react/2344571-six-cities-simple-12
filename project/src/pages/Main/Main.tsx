import MapComponent from '../../components/map/map-component';
import { sortOffers, LOCATIONS } from '../../const';
import { setActiveCity } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import SortList from '../../components/sort-list/sort-list';
import { useMemo, useState } from 'react';
import MainScreenEmpty from '../main-empty/main-empty';
import { HeaderMenu } from '../../components/header-menu/header-menu';
import OffersListComponent from '../../components/offers-list/offers-list';
import { City } from '../../types/offer';

function MainScreen(): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<null | number>(null);

  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(({ city }) => city);

  const offers = useAppSelector((state) => state.offers);

  const activeSortType = useAppSelector(({ sortOption }) => sortOption);

  const currentedOffers = useMemo(() => {
    const currentOffers = offers.filter((offer) => offer.city.name === selectedCity.name);
    return sortOffers(currentOffers, activeSortType);
  }, [offers, activeSortType, selectedCity.name]);

  const handleChangeCity = (evt: React.MouseEvent<HTMLAnchorElement>, city: City) => {
    evt.preventDefault();
    dispatch(setActiveCity(city));
  };

  const noOffers = currentedOffers.length < 1;

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className='tabs'>
        <section className='locations container'>
          <ul className='locations__list tabs__list'>
            {LOCATIONS.map((city) => (
              <HeaderMenu
                city={city}
                key={city.name}
                isActive={selectedCity.name === city.name}
                changeCurrentLocation={handleChangeCity}
              />
            ))}
          </ul>
        </section>
      </div>
      <div className='cities'>
        {noOffers ? (<MainScreenEmpty cityName={selectedCity.name} />) : (
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentedOffers.length}&nbsp;{currentedOffers.length <= 1 ? 'place' : 'places'} to stay in {selectedCity.name}</b>
              <SortList selectedSortItem={activeSortType} />
              <OffersListComponent offers={currentedOffers} setActiveOffer={setActiveOffer} />
            </section>
            <div className="cities__right-section">
              <MapComponent className='cities__map map' activeOffer={activeOffer} offers={currentedOffers} style={{ height: '1100px' }} />
            </div>
          </div>
        )}
      </div>
    </main>

  );
}

export default MainScreen;
