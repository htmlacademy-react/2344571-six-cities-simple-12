import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import Main from '../../pages/Main/Main';
import Room from '../../pages/Room/Room';
import PageNotFound from '../PageNotFound/PageNotFound';

import { OffersType } from '../../types/offers';
import { ReviewsType } from '../../types/reviews';
import { UserType } from '../../types/user';

type AppProps = {
	offers: OffersType;
	reviews: ReviewsType;
	user: UserType;
}

function App({ offers, reviews, user }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
			  <Route path="/" element={< Main offers={offers} user={user} />} />
        <Route path="Login" element={<Login />} />
			  <Route path="/offer/:id" element={<Room offers={offers} reviews={reviews} user={user} />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
