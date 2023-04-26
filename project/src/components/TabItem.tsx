import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../hooks';
import { changeActiveCity } from '../store/action';

type TabItemProps = {
	city: string;
}

const TabItem = ({ city }: TabItemProps): JSX.Element => {
  const activeTab = useAppSelector((state) => state.activeCity);
  const dispatch = useAppDispatch();

  const linkClassName = cn('locations__item-link tabs__item', {
    'tabs__item--active': city === activeTab,
  });

  return (
    <li className="locations__item" onClick={() => dispatch(changeActiveCity(city))}>
      <a className={linkClassName} href="#">
        <span>{city}</span>
      </a>
    </li>
  );
};

export default TabItem;
