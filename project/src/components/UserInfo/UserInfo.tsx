import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { useAppSelector } from '../../hooks';

function UserInfo(): JSX.Element {
  const {user} = useAppSelector((state) => state);

  return (
    <li className="header__nav-item user">
      <Link
        className="header__nav-link header__nav-link--profile"
        to={AppRoute.Offer}
      >
        <div
          style={{
            backgroundImage: `url(${user && user.avatarUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            borderRadius: '50%',
          }}
          className="header__avatar-wrapper user__avatar-wrapper"
        />
        <span className="header__user-name user__name">{user && user.email}</span>
        <span className="header__favorite-count">4</span>
      </Link>
    </li>
  );
}

export default UserInfo;
