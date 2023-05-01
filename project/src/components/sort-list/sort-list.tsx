import { useState } from 'react';
import { useAppDispatch } from '../../hooks/store';
import { SortMenuItems } from '../../const';
import { changeOffersSort } from '../../store/action';

type SortListProps = {
  selectedSortItem: string;
};

function SortList({ selectedSortItem }: SortListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [isOpenSortList, setIsOpenSortList] = useState(false);

  function handelOpenSortList() {
    setIsOpenSortList(true);
  }

  function handelChooseSort(item: string) {
    dispatch(changeOffersSort(item));
    setIsOpenSortList(false);
  }

  return (
    <form className='places__sorting' action='#' method='get'>
      <span className='places__sorting-caption'>Sort by</span>
      <span className='places__sorting-type' tabIndex={0} onClick={handelOpenSortList}>
        {selectedSortItem}
        <svg className='places__sorting-arrow' width={7} height={4}>
          <use xlinkHref='#icon-arrow-select' />
        </svg>
      </span>
      {isOpenSortList && (
        <ul className='places__options places__options--custom places__options--opened'>
          {Object.values(SortMenuItems).map((item) =>
            <li className='places__option' onClick={() => handelChooseSort(item)} tabIndex={0} key={item}>{item}</li>
          )}
        </ul>
      )}
    </form>
  );
}

export default SortList;
