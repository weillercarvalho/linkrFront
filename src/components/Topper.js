import styled from "styled-components";
import open from "../assets/images/Open.png"
import perfil from "../assets/images/image 3.png"

export default function Topper(){
    return(
        <>
            <Top>
                <p>Linkr</p>
                {/* >>> Barra de Search aqui <<< */}
                <PhotoLog>
                    <img src={open} alt=""/>
                    <img src={perfil} alt=""/>
                </PhotoLog>
            </Top>
        </>
    )
};

const Top = styled.div`
    width: 100vw;
    height: 8vh;
    min-height: 72px;
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    z-index: 3;
    background-color: #171717;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 28px;

    p {
        font-family: 'Passion One', cursive;
        font-weight: 700;
        font-size: 49px;
        color: #ffffff;
    }
    
`
const PhotoLog = styled.div`
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;

    img{
        margin-left: 1.5vw;
    }
`