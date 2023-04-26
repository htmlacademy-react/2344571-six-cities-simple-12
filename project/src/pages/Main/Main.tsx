import Tabs from '../../components/Tabs/Tabs';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { OffersType } from '../../types/offers';
import FormSorting from '../../components/FormSorting/FormSorting';
import Offers from '../../components/Offers/Offers';
import { useState } from 'react';
import cn from 'classnames';
import MainEmpty from '../../components/MainEmpty/MainEmpty';
import Map from '../../components/Map/Map';
import { Cities } from '../../constants';
import { useAppSelector } from '../../hooks';
import Loader from '../../components/loader/loader';
import HeaderNav from '../../components/HeaderNav/HeaderNav';

enum SortOption {
	Popular = 'Popular',
	LowToHigh = 'Price: low to high',
	HighToLow = 'Price: high to low',
	TopRatedFirst = 'Top rated first',
}

const sortByOption = (offers: OffersType, activeSortType: string) => {
  switch (activeSortType) {
    case SortOption.Popular:
      return offers;
    case SortOption.LowToHigh:
      return offers.sort((offerA, offerB) => offerA.price - offerB.price);
    case SortOption.HighToLow:
      return offers.sort((offerA, offerB) => offerB.price - offerA.price);
    case SortOption.TopRatedFirst:
      return offers.sort((offerA, offerB) => offerB.rating - offerA.rating);
    default:
      return offers;
  }
};

function Main(): JSX.Element {
  const [activeOfferID, setActiveOfferID] = useState<number | null>(null);

  const offers = useAppSelector((state) => state.offers);
  const activeCity = useAppSelector((state) => state.activeCity);
  const activeSortType = useAppSelector((state) => state.activeSortType);
  const filteredOffers = offers.filter((offer) => offer.city.name === activeCity);
  const currentOffers = sortByOption(filteredOffers, activeSortType);
  const { isDataLoaded } = useAppSelector((state) => state);

  if (isDataLoaded) {
    return (
      <Loader />
    );
  }

  const handleOfferMouseOver = (id: number) => setActiveOfferID(id);
  const handleOfferMouseLeave = () => setActiveOfferID(null);

  const getTitle = (numberOfOffers: number) => (
    `${numberOfOffers} ${numberOfOffers === 1 ? 'place' : 'places'} to stay in ${activeCity}`
  );

  const mainClassName = cn('page__main page__main--index', {
    'page__main--index-empty': Boolean(currentOffers.length),
  });

  return (
    <>
      <Header>
        <HeaderNav/>
      </Header>
      <main className={mainClassName}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <Tabs cities={Cities} />
          </section>
        </div>
        <div className="cities">{
          currentOffers.length === 0
            ?
            <MainEmpty city={activeCity} />
            : (
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{getTitle(currentOffers.length)}</b>
                  <FormSorting/>
                  <Offers
                    offers={currentOffers}
                    onOfferMouseOver={handleOfferMouseOver}
                    onOfferMouseLeave={handleOfferMouseLeave}
                  />
                </section>
                <div className="cities__right-section">
                  <Map
                    cityInfo={currentOffers[0].city}
                    points={currentOffers}
                    activeOfferID={activeOfferID}
                  />
                </div>
              </div>
            )
        }
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Main;
