type CityProps = {
    city: string;
}

function Tab({ city }: CityProps): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        <li className="locations__item">
          <a className="locations__item-link tabs__item" href="#">
            <span>{city}</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Tab;
