import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import Main from '../../pages/Main/Main';
import Room from '../../pages/Room/Room';
import PageNotFound from '../PageNotFound/PageNotFound';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';

type Props = {
	reviews: Review[];
	offers: Offer[];
}

function App({ reviews, offers }: Props): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< Main rentAmount={312} offers={offers} />} />
        <Route path="Login" element={<Login />} />
        <Route path="/offer/:id" element={<Room />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
