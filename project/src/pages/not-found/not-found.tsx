import { Link } from 'react-router-dom';

function ErrorScreen(): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z" /></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z" /></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z" /></symbol></svg>
      </div>
      <main className="page__main page__main--login">
        <div className='page__login-container container'>
          <section className='login'>
            <h1 className='login__title' style={{ fontSize: 150, textAlign: 'left' }}>404</h1>
            <p className='login__submit' style={{ fontSize: 20, textAlign: 'left' }}>The page can&apos;t be found</p>
            <Link className='login__submit form__submit button' to='/' style={{ fontSize: 20, textAlign: 'left', textTransform: 'uppercase' }}>
              Go to homepage
            </Link>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ErrorScreen;
