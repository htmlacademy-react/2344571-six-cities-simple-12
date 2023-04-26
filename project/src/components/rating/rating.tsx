type RatingProps = {
  value: number;
  title: string;
  onChangeData: (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const Rating = ({ value, title, onChangeData }: RatingProps) => (
  <>
    <input className="form__rating-input visually-hidden" name="rating" value={`${value}`} id={`${value}-stars`} type="radio" onChange={onChangeData} />
    <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
      <svg className="form__star-image" width="37" height="33">
        <use xlinkHref="#icon-star"></use>
      </svg>
    </label>
  </>
);

export default Rating;
