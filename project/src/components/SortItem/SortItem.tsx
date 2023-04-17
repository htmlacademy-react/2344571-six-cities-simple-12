import cn from 'classnames';

type SortOptionProps = {
	option: string;
	onOptionClick: () => void;
	isActive: boolean;
}

function SortItem({ option, onOptionClick, isActive }: SortOptionProps):JSX.Element {
  const optionClassName = cn('places__option', {
    'places__option--active': isActive,
  });

  return (
    <li
      className={optionClassName}
      tabIndex={0}
      onClick={() => onOptionClick()}
    >
      {option}
    </li>
  );
}

export default SortItem;
