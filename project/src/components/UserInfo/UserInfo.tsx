import { UserType } from '../../types/user';

type UserInfoProps = {
	user: UserType;
}

function UserInfo({ user }: UserInfoProps):JSX.Element {
  return(
    <li className="header__nav-item user">
      <a className="header__nav-link header__nav-link--profile" href="#">
        <div className="header__avatar-wrapper user__avatar-wrapper" />
        <span className="header__user-name user__name">{user.email}</span>
        <span className="header__favorite-count">4</span>
      </a>
    </li>
  );
}

export default UserInfo;
