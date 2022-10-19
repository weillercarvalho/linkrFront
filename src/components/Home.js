import styled from "styled-components";

export default function Home() {
    return (
        <>
            <Father>
                <nav>
                    <p>
                        linkr
                    </p>
                </nav>
            </Father>
        </>
    )
}

const Father = styled.div`
    display:flex;
    flex-direction: column;
    nav {
        width: 100%;
        height: 72px;
        position: fixed;
        top: 0px;
        left: 0px;
        background-color: #151515;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 1;
    }
    p {
        font-family: 'Passion One', cursive;
        font-weight: 700;
        font-size: 49px;
        margin-left: 28px;
    }
    section {
        display:flex;
    }
    button {
        font-family: 'Lato', sans-serif;
        color: #ffffff;
        background-color: #151515;
        border-radius: 5px;
        &:hover{
            cursor: pointer;
        }
        
    }
    img {
        margin-left: 17px;
    }
`