import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import Main from '../../pages/Main/Main';
import Room from '../../pages/Room/Room';
import PageNotFound from '../PageNotFound/PageNotFound';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< Main rentAmount={312} />} />
        <Route path="Login" element={<Login />} />
        <Route path="/offer/:id" element={<Room />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
