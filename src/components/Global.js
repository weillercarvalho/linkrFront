import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
    *{
        box-sizing:border-box;
        --microlink-background-color: #151515;
        --microlink-color: #ffffff;
        --microlink-max-width: 100%;
        --microlink-border-radius: 5px;
        --microlink-hover-background-color: #151515;
        --microlink-font-size: 20px;
    }
    body {
        width: 100vw;
        height: 100vh;
        font-family: 'Lato', sans-serif;
        font-family: 'Oswald', sans-serif;
        font-family: 'Passion One', cursive;
        background-color: #333333;
    }
    @media (max-width: 375px) {
        width: 100%;
        height: 100%;
    }
`;

export { Global };
