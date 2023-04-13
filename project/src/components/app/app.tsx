import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import Main from '../../pages/Main/Main';
import Room from '../../pages/Room/Room';
import PageNotFound from '../PageNotFound/PageNotFound';
import ScrollToTop from '../ScrollToTop/ScrollToTop';


function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="Login" element={<Login/>} />
        <Route path="/offer/:id" element={<Room/>} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
