import { Global } from "./Global";
import { Reset } from "styled-reset";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Registered from "./Registered";

export default function App() {
  return (
    <>
      <Reset />
      <Global />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registered" element={<Registered />} />
          <Route path="/timeline" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
