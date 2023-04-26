import { Link } from 'react-router-dom';
import './not-found.css';

const NotFound = () => (
  <>
    <section className="not_found">
      <h1>404. Page not found</h1>
    </section>
    <section className="back">
      <Link to="/">Вернуться на главную</Link>
    </section>
  </>
);

export default NotFound;
