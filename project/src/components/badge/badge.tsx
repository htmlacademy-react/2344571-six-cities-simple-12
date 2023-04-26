import classnames from 'classnames';

type BadgeProps = {
  className: string;
};

const Badge = ({ className }: BadgeProps) => (
  <div className={classnames(className)}>
    <span>Premium</span>
  </div>
);

export default Badge;
