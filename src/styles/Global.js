import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
    *{

        .microlink_card {
            border-radius: 8px;
            width: calc(40vw - 10rem);
            @media (max-width: 375px) {
                width: 255px;

                img {
                    object-fit: cover;
                }

                .microlink_card__content_title {
                    background-color: transparent;
                    margin: 0;
                }

                .microlink_card__content_url {
                    margin: 0;
                }

                .microlink_card__content{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                }
            }
        }

        box-sizing:border-box;
        --microlink-background-color: #151515;
        --microlink-color: #ffffff;
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
