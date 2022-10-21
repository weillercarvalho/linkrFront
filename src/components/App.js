import { Global } from "./Global";
import { Reset } from "styled-reset";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          <Route path="/Registered" element={<Registered />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
