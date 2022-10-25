import styled from 'styled-components';
import open from '../assets/images/Open.png';
import close from '../assets/images/Close.png';
import RenderSearchbar from './Searchbar';
import { useState } from 'react';
import { useContainerDimensions } from '../hooks/getContainerDimensions';
import { Father, Nav1, Nav2, Nav3 } from '../styles/Common';
import { useNavigate } from 'react-router-dom';

export default function Topper({ picture, windowRef, att, setAtt }) {
  const windowWidth = useContainerDimensions(windowRef).width;
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();

  return (
    <Father ref={windowRef}>
      <Top>
        <p onClick={() => navigate('/timeline')}>Linkr</p>
        {windowWidth <= 375 ? (
          <></>
        ) : (
          <RenderSearchbar att={att} setAtt={setAtt} mobile={false} />
        )}
        <PhotoLog>
          {logout ? (
            <>
              <Nav1>
                <img src={close} onClick={() => setLogout(!logout)} alt="" />
              </Nav1>
              <Nav3 onClick={getout}>Logout</Nav3>
            </>
          ) : (
            <>
              <Nav1>
                <img src={open} onClick={() => setLogout(!logout)} alt="" />
              </Nav1>
            </>
          )}
          <Nav2>
            <img src={picture} alt="" />
          </Nav2>
        </PhotoLog>
      </Top>
    </Father>
  );
}

function getout() {
  localStorage.clear();
  window.location.replace('https://linkrfront.vercel.app/');
}

const Top = styled.div`
  width: 100%;
  height: 8vh;
  min-height: 72px;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  z-index: 1;
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
`;
const PhotoLog = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;

  img {
    margin-left: 1.5vw;
  }
`;
