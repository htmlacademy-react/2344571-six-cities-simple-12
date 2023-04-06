import Tab from '../../components/Tab/Tab';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { CityType, OffersType } from '../../types/offers';
import { UserType } from '../../types/user';
import FormSorting from '../../components/FormSorting/FormSorting';
import Offers from '../../components/Offers/Offers';
import { useLayoutEffect, useState } from 'react';
import cn from 'classnames';
import MainEmpty from '../../components/MainEmpty/MainEmpty';
import Map from '../../components/Map/Map';

type MainProps = {
	offers: OffersType;
	user: UserType;
}

const filterOffersByCity = (offers: OffersType, city: string): OffersType => (
  offers.filter((offer) => offer.city.name === city)
);

const findCityInfo = (offers: OffersType, activeTab: string): CityType => (
  filterOffersByCity(offers, activeTab)[0].city
);

function Main({ offers, user }: MainProps): JSX.Element {
  const [activeTab, setActiveTab] = useState('');
  const [filteredOffers, setFilteredOffers] = useState<OffersType>([]);
  const [activeOfferID, setActiveOfferID] = useState<number | null>(null);

  useLayoutEffect(() => {
    setActiveTab('Amsterdam');
    setFilteredOffers(filterOffersByCity(offers, 'Amsterdam'));
  }, [offers]);

  const handleTabClick = (city: string) => {
    setActiveTab(city);
    setFilteredOffers(filterOffersByCity(offers, city));
  };

  const mainClassName = cn('page__main page__main--index', {
    'page__main--index-empty': Boolean(filteredOffers.length),
  });

  const getTitle = (numberOfOffers: number) => (
    `${numberOfOffers} ${numberOfOffers === 1 ? 'place' : 'places'} to stay in ${activeTab}`
  );

  const handleOfferMouseOver = (id: number) => setActiveOfferID(id);
  const handleOfferMouseLeave = () => setActiveOfferID(null);

  const cities: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
  return (
    <><Header user={user} />
      <main className={mainClassName}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cities.map((city) => (
                <Tab
                  city={city}
                  key={city}
                  onTabClick={handleTabClick}
                  activeTab={activeTab}
                />))}
            </ul>
          </section>
        </div>
        <div className="cities">{
          filteredOffers.length === 0
            ?
            <MainEmpty city={activeTab} />
            : (
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{getTitle(filteredOffers.length)}</b>
                  <FormSorting />
                  <Offers
                    offers={offers}
                    onOfferMouseOver={handleOfferMouseOver}
                    onOfferMouseLeave={handleOfferMouseLeave}
                  />
                </section>
                <div className="cities__right-section">
                  <Map
                    cityInfo={findCityInfo(offers, activeTab)}
                    points={filteredOffers}
                    activeOfferID={activeOfferID}
                    screenClass={'cities'}
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
