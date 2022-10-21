import styled from 'styled-components';

const Posting = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
  section {
    display: flex;
    flex-direction: row;
    height: 209px;
    background-color: #171717;
    border-radius: 16px;
    width: 50%;
    margin: auto auto 29px auto;
    color: #b7b7b7;
  }
  img {
    margin: 15px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex !important;
  }
  nav {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    margin-left: 35px;
    margin-right: 10px;
  }
  div {
    height: 80px;
    border-radius: 15px;
    font-family: 'Lato', sans-serif !important;
    font-weight: 400;
    font-size: 17px;
    margin-bottom: 10px;
    width: 100%;
  }
  span {
    font-family: 'Lato', sans-serif !important;
    font-weight: 400;
    font-size: 17px;
    margin-bottom: 20px;
  }
  p {
    font-size: 18px !important;
    font-family: 'Lato', sans-serif !important;
    font-weight: 400 !important;
  }
  @media (max-width: 375px) {
    section {
      width: 100%;
    }
    nav {
      margin-left: 10px;
    }
    div {
      width: 15%;
    }
  }
`;

const Father = styled.div`
  display: flex;
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
    display: flex;
  }
  button {
    font-family: 'Lato', sans-serif;
    color: #ffffff;
    background-color: #151515;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
    }
  }
  img {
    margin-right: 17px;
    margin-left: 10px;
    width: 50px;
    height: 50px;
  }
`;
const Nav1 = styled.div`
  img {
    margin-top: 35px;
    width: 18.38px;
    height: 12.38px;
  }
`;
const Nav2 = styled.div`
  img {
    margin-top: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;
const Mainline = styled.div`
  display: flex;
  flex-direction: column;
  margin: 150px auto auto auto;
  width: 100%;
  p {
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 43px;
    color: #ffffff;
    margin-bottom: 43px;
    margin-left: 500px;
  }
  header {
    display: flex;
    flex-direction: row;
    height: 209px;
    background-color: #ffffff;
    border-radius: 16px;
    margin: auto auto 29px auto;
    width: 50%;
  }
  input {
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    border: none;
    background-color: transparent;
    font-size: 17px;
    ::placeholder {
      font-family: 'Lato', sans-serif;
      font-weight: 400;
      color: #707070;
      font-size: 15px;
    }
    margin: 20px 10px 10px 10px;
  }
  button {
    width: 112px;
    height: 31px;
    border-radius: 5px;
    background-color: #1877f2;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    color: #ffffff;
    margin-left: 120px;
    &:hover {
      cursor: pointer;
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  label {
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #707070;
    margin: 10px;
  }
  @media (max-width: 375px) {
    p {
      margin-left: 20px;
    }
    header {
      width: 100%;
    }
    img {
      display: none;
    }
    button {
      position: absolute;
      left: 130px;
    }
    input {
      width: 50%;
    }
  }
`;
const Div1 = styled.div`
  margin: 16px 18px auto 18px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;
const Div2 = styled.div`
  display: flex;
  flex-direction: column;
`;
const Div3 = styled.div`
  margin-left: 550px;
`;

export { Father, Nav1, Nav2, Mainline, Div1, Div2, Div3, Posting };
