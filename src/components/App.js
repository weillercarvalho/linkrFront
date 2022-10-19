import { Global } from "./Global";
import {Reset} from "styled-reset";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <>
            <Reset />
            <Global />
            <BrowserRouter>
                <Routes>
                    <Route/>
                </Routes>
            </BrowserRouter>
        </>
    )
}