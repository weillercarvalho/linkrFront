import styled from 'styled-components';

const Posting = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
  section {
    position: relative;
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
// const Div3 = styled.div`
//   margin-left: 550px;
// `;

const Div3 = styled.div`
  display: flex;
  justify-content: flex-end;
  width: calc(${({ horizontal }) => horizontal}px - 110px);
`;

const SearchParent = styled.div`
  margin-top: 35px;
  height: 100%;
  position: relative;
`;

const SearchBar = styled.div`
  width: 60vw;
  height: 50%;
  background-color: #ffffff;
  color: black;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: ${({ bottom }) => (bottom ? 8 : 0)}px;
  border-bottom-right-radius: ${({ bottom }) => (bottom ? 8 : 0)}px;
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 5px 10px;

  div {
  }

  input {
    width: 55vw;
    font-family: 'Lato', sans-serif;
    border: none;
  }
  textarea:focus,
  input:focus {
    outline: none;
  }
`;

const SearchResults = styled.div`
  width: 60vw;
  height: auto;
  background-color: #e7e7e7;
  color: black;
  display: grid;
  padding: 15px 0 0 15px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const SearchResult = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 15px 0;
`;

const SearchImg = styled.img`
  object-fit: cover;
  border-radius: 100%;
`;

const UsernameTitle = styled.div`
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 43px;
  color: #ffffff;
  margin: auto auto 30px auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 50%;

  div {
    margin: 0 10px 0 0;
    height: 50px;
  }

  img {
    margin: 0 15px 0 15px;
    width: 50px;
    height: 50px;
    border-radius: 100%;
  }
`;

const BlankTimeline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 40px 0 0 0;
  font-family: 'Lato', sans-serif;
  color: rgba(255, 255, 255, 0.6);
  font-size: 60px;

  div {
    margin: 35px 0 0 0;
    font-size: 42px;
  }
`;

const RenderError = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 58px;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  color: #f7f7f7;

  div {
    margin: 40px 0 40px 0;
  }

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const UpdateContainer = styled.div`
  position: absolute;
  font-size: 40px;
  width: 30px !important;
  margin: 0 0 0 0;
  right: 0;
`;

const DeletePost = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  height: 30px;
  width: 30px;
  top: 10px;
  right: 20px;
`;
const UpdatePost = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  height: 30px;
  width: 30px;
  top: 10px;
  right: 50px;
`;

const ModalContent = styled.div`
  height: 20vh;
  width: 35vw;
  font-family: 'Lato', sans-serif !important;
  font-weight: 400;
  font-size: 17px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  color: #ffffff;
  position: relative;
`;

const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 6px 0 0 0;
  font-size: 34px;
  text-align: center;
`;

const CancelButtom = styled.div`
  width: 45%;
  height: 8vh;
  background-color: #ffffff;
  color: #1877f2;
  margin: 0 10% 0 0;
  border-radius: 8px;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeleteButtom = styled.div`
  width: 45%;
  background-color: #1877f2;
  color: #ffffff;
  margin: 0 0 0 0;
  border-radius: 8px;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OptionsContainer = styled.div`
  bottom: 0;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
`;

const AnimationContainer = styled.div`
  height: 200px;
  width: 200px;
  color: #ffffff;

  div {
    width: auto;
    height: 50%;
    color: #ffffff;
    margin: 2% 0 2% 0;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

const EditForms = styled.form`
  width: 100% !important;
`;

const EditInput = styled.input`
  background-color: #ffffff !important;
  border-radius: 5px;
  font-family: 'Lato', sans-serif !important;
  font-weight: 400;
  font-size: 17px;
  margin: 0 0 20px 0 !important;
  width: 100%;

  textarea:focus,
  input:focus {
    outline: none;
    box-shadow: none;
    border: none;
  }
`;

export {
  Father,
  Nav1,
  Nav2,
  Mainline,
  Div1,
  Div2,
  Div3,
  Posting,
  SearchBar,
  SearchParent,
  SearchResults,
  SearchResult,
  SearchImg,
  UsernameTitle,
  BlankTimeline,
  RenderError,
  UpdateContainer,
  DeletePost,
  UpdatePost,
  ModalContent,
  DeleteButtom,
  CancelButtom,
  OptionsContainer,
  ModalTitle,
  AnimationContainer,
  EditInput,
  EditForms,
};
