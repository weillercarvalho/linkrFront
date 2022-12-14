import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getTrendingTopics } from '../services/Services';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function TrendingTopics({setAtt, att}) {
  const [hashtagsList, SetHashtagsList] = useState([]);
  useEffect(() => {
    getTrendingTopics()
      .catch((r) => {
        console.log(r);
      })
      .then((r) => {
        SetHashtagsList(r.data);
      });
  }, []);

  const navigate = useNavigate();
  function goToPage(str){
    navigate(`/hashtag/${str}`);
    window.location.reload();
    //setAtt(att)
  }

  return (
    <>
      <Trending>
        <h3>trending</h3>
        <div className="division"></div>
        <div className="hashs">
          {hashtagsList.map((value, index) => (
              <h6 onClick={()=> {goToPage(value.id)}}>{`${value.name}`}</h6>
          ))}
        </div>
      </Trending>
    </>
  );
}

const Trending = styled.div`
  width: 21vw;
  height: auto;
  max-width: 301px;
  min-width: 200px;
  min-height: 300px;
  background-color: #171717;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-left: 2vw;
  padding-bottom: 2vh;
  position: fixed;
  top: 235px;
  left: 65vw;
  z-index: 15;

  a {
    text-decoration: none;
  }

  h3 {
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 29px;
    line-height: 40px;
    color: #ffffff;
    margin: 1vh 0 0.5vw 1vw;
  }

  .division {
    width: 100%;
    height: 0px;
    border: 1px solid #484848;
  }

  .hashs {
    width: 30%;
    height: auto;
    min-height: 10px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 2vh 0 3vh 1vw;
  }

  .hashs h6 {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 21px;
    margin-bottom: 1vh;
    letter-spacing: 0.05em;
    color: #ffffff;
    cursor: pointer;
  }

  @media (max-width: 1200px) { 
    display: none; 
  }
`;
