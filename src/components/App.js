import { Global } from "./Global";
import { Reset } from "styled-reset";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Registered from "./Registered";
import UserPage from "./UserPage";
import ErrorPage from "./Error";
import PrivatePage from "../services/PrivatePage";
import { UserContext } from "./Context";
import { useState } from "react";

export default function App() {
  const [token,setToken] = useState(false);

  const auth = localStorage.getItem(`token`)

  if (auth && token === false) {
    return setToken(auth)
  }

  return (
    <>
      <Reset />
      <UserContext.Provider value={{token,setToken}}>
      <Global />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registered" element={<Registered />} />
          <Route path="/timeline" element={<PrivatePage><Home /></PrivatePage>} />
          <Route path="/user/:userId" element={<PrivatePage><UserPage /></PrivatePage>} />
          <Route path="/error" element={<PrivatePage><ErrorPage /></PrivatePage>} />
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}
