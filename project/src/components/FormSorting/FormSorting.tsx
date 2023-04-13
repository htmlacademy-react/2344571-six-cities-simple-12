import { useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import cn from 'classnames';
import { setSortType } from '../../store/action';
import SortItem from '../SortItem/SortItem';

function FormSorting(): JSX.Element {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const formRef = useRef(null);

  const clickOutsideHandler = () => isSelectOpen && handleOptionClick();
  useOnClickOutside(formRef, clickOutsideHandler);

  const activeSortType = useAppSelector((state) => state.activeSortType);
  const dispatch = useAppDispatch();

  const handleOptionClick = () => setIsSelectOpen(!isSelectOpen);

  const selectClassName = cn('places__options places__options--custom', {
    'places__options--opened': isSelectOpen,
  });

	enum SortOption {
		Popular = 'Popular',
		LowToHigh = 'Price: low to high',
		HighToLow = 'Price: high to low',
		TopRatedFirst = 'Top rated first',
	}

	return (
	  <form className="places__sorting" action="#" method="get">
	    <span className="places__sorting-caption">Sort by</span>
	    <span className="places__sorting-type" tabIndex={0} onClick={handleOptionClick}>
	      {activeSortType}
	      <svg className="places__sorting-arrow" width="7" height="4">
	        <use xlinkHref="#icon-arrow-select" />
	      </svg>
	    </span>
	    <ul className={selectClassName} ref={formRef}>
	      {Object.values(SortOption).map((option) => (
	        <SortItem
	          key={option}
	          option={option}
	          onOptionClick={() => {
	            dispatch(setSortType({ option: option }));
	            handleOptionClick();
	          }}
	          isActive={option === activeSortType}
	        />
	      ))}
	    </ul>
	  </form>
	);
}

export default FormSorting;
