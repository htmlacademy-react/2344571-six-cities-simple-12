import TabItem from '../TabItem';

type TabProps = {
	cities: string[];
}

function Tab({ cities }: TabProps): JSX.Element {

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => <TabItem key={city} city={city} />)}
    </ul>
  );
}

export default Tab;
