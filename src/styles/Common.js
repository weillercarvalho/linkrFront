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
    width: 40%;
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
      width: 100vw;
    }
    nav {
      margin-left: 10px;
    }
    div {
      width: 100%;
    }
  }
`;

const Father = styled.div`
  display: flex;
  flex-direction: column;
  nav {
    width: ${(mobile) => (mobile.mobile ? '100vw' : '100vw')};
    height: 72px;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: #151515;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  @media (max-width: 375px) {
    p {
      margin-left: 10px;
    }
  }
`;
const Nav1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 18.38px;
    height: 12.38px;
    &:hover {
      cursor: pointer;
    }
    &:active {
      transform: scale(0.9);
    }
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
const Nav3 = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #151515;
  color: #ffffff;
  width: 150px;
  height: 40px;
  position: absolute;
  right: 0px;
  top: 70px;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
const Mainline = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${(mobile) =>
    mobile.mobile ? '100px 0 0 0' : '150px auto auto auto'};
  width: ${(mobile) => (mobile.mobile ? '100%' : '100%')};
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
    width: ${(mobile) => (mobile.mobile ? '100%' : '40%')};
    min-width: ${(mobile) => (mobile.mobile ? '100%' : '500px')};
    margin: ${(mobile) => (mobile.mobile ? '0' : '0 0 17px 25%')};
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
      margin-top: 20px;
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
  margin: auto;
`;

const Div3 = styled.div`
  display: flex;
  justify-content: flex-end;
  width: calc(${({ horizontal }) => horizontal}px - 110px);
`;

const SearchParent = styled.div`
  margin-top: ${(mobile) => (mobile.mobile ? '0' : '35px')};
  width: ${(mobile) => (mobile.mobile ? '90%' : 'auto')};
  left: 5%;
  height: 100%;
  position: relative;
`;

const SearchBar = styled.div`
  width: ${(mobile) => (mobile.mobile ? '90vw' : '60vw')};
  height: 50%;
  background-color: #ffffff;
  color: black;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: ${({ bottom }) => (bottom ? 8 : 0)}px;
  border-bottom-right-radius: ${({ bottom }) => (bottom ? 8 : 0)}px;
  display: flex;
  justify-content: space-between;
  align-items: ${(mobile) => (mobile.mobile ? 'center' : 'auto')};
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
  width: ${(mobile) => (mobile.mobile ? '90vw' : '60vw')};
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
  margin: ${(mobile) =>
    mobile.mobile ? '30px auto 30px auto' : 'auto auto 30px auto'};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: ${(mobile) => (mobile.mobile ? '100%' : '50%')};

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
  font-size: 22px;
`;

const DeletePost = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  height: 30px;
  width: 30px;
  top: 0px;
  right: 20px;
`;
const UpdatePost = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  height: 30px;
  width: 30px;
  top: 0px;
  right: 50px;
`;

const ModalContent = styled.div`
  height: ${(mobile) => (mobile.mobile ? '25vh' : '20vh')};
  width: ${(mobile) => (mobile.mobile ? 'auto' : '50vw')};
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

const Title = styled.div`
  width: 60vw;
  min-width: 725px;
  height: auto;
  margin: 15vh auto 0 auto;
  box-sizing: border-box;

  h1 {
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
  }
`;

const Organizer = styled.div`
  width: auto;
  min-width: 725px;
  height: 20px;
  display: flex;
  justify-content: center;
  margin: 5vh auto;

  .principalColumn {
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
  }
`;

const SharedContainer = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: -25px;
  height: 45px;
  background-color: #1e1e1e;
  z-index: -2;
  border-radius: 8px;
`;

const SharedDetails = styled.div`
  margin: 5px 0 0 5px;
  display: flex;
  align-items: center;
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
  Nav3,
  Title,
  Organizer,
  SharedContainer,
  SharedDetails,
};
