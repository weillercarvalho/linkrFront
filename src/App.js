import { Global } from './styles/Global';
import { Reset } from 'styled-reset';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registered from './pages/Registered';
import UserPage from './pages/UserPage';
import ErrorPage from './pages/Error';
import PrivatePage from './services/PrivatePage';
import TrendingTopics from './components/Trending';
import HashtagPage from './pages/HashtagPage';

export default function App() {


  return (
    <>
      <Reset />
        <Global />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/trending" element={<TrendingTopics />} />
            <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
            <Route path="/registered" element={<Registered />} />
            <Route
              path="/timeline"
              element={
                <PrivatePage>
                  <Home />
                </PrivatePage>
              }
            />
            <Route
              path="/user/:userId"
              element={
                <PrivatePage>
                  <UserPage />
                </PrivatePage>
              }
            />
            <Route
              path="/error"
              element={
                <PrivatePage>
                  <ErrorPage />
                </PrivatePage>
              }
            />
          </Routes>
        </BrowserRouter>
    </>
  );
}
