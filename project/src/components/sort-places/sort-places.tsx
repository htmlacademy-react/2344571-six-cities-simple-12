import { useState } from 'react';
import { SortingTypes } from '../../constants/constants';
import { useAppDispatch } from '../../hooks';
import { list } from './constants';
import { changeSort } from '../../store/offer-process/offer-process';

const SortPlaces = ({ currentSortName }: {
  currentSortName: SortingTypes;
}) => {
  const [opened, setOpened] = useState(false);
  const dispatch = useAppDispatch();

  const currentValue = list.find((item) => item.value === currentSortName);

  const toggleOpened = () => {
    setOpened(!opened);
  };

  const handleSortClick = (sortName: SortingTypes) => {
    dispatch(changeSort(sortName));
    toggleOpened();
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={toggleOpened}>
        {currentValue?.title || 'Not Selected'}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${opened ? 'places__options--opened' : ''}`}>
        {list.map((item) => (
          <li
            key={item.value}
            className={`
              places__option
              ${currentSortName === item.value ? 'places__option--active' : ''}
            `}
            tabIndex={0}
            onClick={() => { handleSortClick(item.value); }}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default SortPlaces;
