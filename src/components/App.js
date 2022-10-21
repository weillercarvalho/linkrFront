import { Global } from './Global';
import { Reset } from 'styled-reset';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import UserPage from './UserPage';
import ErrorPage from './Error';
export default function App() {
  return (
    <>
      <Reset />
      <Global />
      <BrowserRouter>
        <Routes>
          <Route path="/timeline" element={<Home />} />
          <Route path="/user/:userId" element={<UserPage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
