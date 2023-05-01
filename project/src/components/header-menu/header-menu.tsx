import { Link } from 'react-router-dom';
import { City } from '../../types/offer';

type HeaderMenuProps = {
  isActive: boolean;
  city: City;
  changeCurrentLocation: (e: React.MouseEvent<HTMLAnchorElement>, city: City) => void;
}

function HeaderMenu(props: HeaderMenuProps): JSX.Element {
  const { city, changeCurrentLocation, isActive } = props;
  const setActive = isActive ? 'tabs__item--active' : '';

  return (
    <li className='locations__item'>
      <Link className={`locations__item-link tabs__item ${setActive}`} to={'/'} onClick={(e) => changeCurrentLocation(e, city)}>
        <span>{city.name}</span>
      </Link>
    </li>
  );
}

export { HeaderMenu };
