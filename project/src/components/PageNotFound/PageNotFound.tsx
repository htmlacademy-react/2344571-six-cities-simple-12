import './pageNotFound.css';
import { Link } from 'react-router-dom';

function PageNotFound(): JSX.Element {
  return (
    <div id="main">
      <div className="fof">
        <h1>Error 404</h1>
        <Link to='/'>Go to main page</Link>
      </div>
    </div>
  );
}

export default PageNotFound;
