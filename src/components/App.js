import { Global } from "./Global";
import {Reset} from "styled-reset";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
export default function App() {
    return (
        <>
            <Reset />
            <Global />
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<Home />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}