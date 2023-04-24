import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { AppRoute } from '../../constants';

type PageProps = {
	children: JSX.Element;
}

function Page({ children }: PageProps): JSX.Element {
  const { pathname } = useLocation();
  const [pageClassName, setPageClassName] = useState('page');

  useEffect(() => {
    setPageClassName(cn('page', {
      'page--gray page--main': pathname === AppRoute.Root,
      'page--gray page--login': pathname === AppRoute.Login,
    }));
  }, [pathname]);

  return (
    <div className={pageClassName}>
      {children}
    </div>
  );
}

export default Page;
