import Cities from '../../components/cities';
import MainEmpty from '../../components/main-empty';
import MainPageContent from '../../components/main-page-content';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { cityChange } from '../../store/offer-process/offer-process';
import { getSortingOffers } from '../../utils/getSortingOffers';

const Main = () => {
  const dispatch = useAppDispatch();
  const curentCity = useAppSelector((state) => state.OFFER.city);
  const offers = useAppSelector((state) => state.OFFER.offers);
  const currentSortName = useAppSelector((state) => state.OFFER.sortName);

  const onChangeCity = (city: string) => {
    dispatch(cityChange(city));
  };

  const currentOffers = offers.filter(
    (offer) => offer.city.name === curentCity
  );

  const sortingOffers = getSortingOffers(currentOffers, currentSortName);
  return (
    < main className="page__main page__main--index" >
      <h1 className="visually-hidden">Cities</h1>
      <Cities currentCity={curentCity} onChangeCity={onChangeCity} />
      {!currentOffers.length ? (
        <MainEmpty city={curentCity} />
      ) :
        <MainPageContent placesCount={currentOffers.length} currentCity={curentCity} offers={sortingOffers} currentSortName={currentSortName} />}
    </main >
  );
};

export default Main;
