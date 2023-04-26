import cn from 'classnames';
import { CITIES } from './constants';

type CitiesProps = {
  currentCity: string;
  onChangeCity: (city: string) => void;
};

const Cities = ({ currentCity, onChangeCity }: CitiesProps) => {
  const handleChangeCity = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>, city: string) => {
    evt.preventDefault();
    onChangeCity(city);
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => {
            const className = cn('locations__item-link tabs__item', {
              'tabs__item--active': currentCity === city,
            });
            return (
              <li className="locations__item" key={city}>
                <a
                  className={className}
                  href="/#"
                  onClick={(evt) => {
                    handleChangeCity(evt, city);
                  }}
                >
                  <span>{city}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default Cities;
