import styled from "styled-components";
import open from "../assets/images/Open.png";
import oldman from "../assets/images/image 3.png";
export default function Home() {
  return (
    <>
      <Father>
        <nav>
          <p>linkr</p>
          <section>
            <Nav1>
              <img src={open} alt="" />
            </Nav1>
            <Nav2>
              <img src={oldman} alt="" />
            </Nav2>
          </section>
        </nav>
      </Father>
      <Mainline>
        <p>timeline</p>
        <header>
          <Div1>
            <img src={oldman} alt="" />
          </Div1>
          <form>
            <Div2>
              <input placeholder="Oi"></input>
              <input placeholder="Oi"></input>
              <input placeholder="Oi"></input>
            </Div2>
            <Div3>
              <button>Publish</button>
            </Div3>
          </form>
        </header>
      </Mainline>
    </>
  );
}

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
    font-family: "Passion One", cursive;
    font-weight: 700;
    font-size: 49px;
    margin-left: 28px;
  }
  section {
    display: flex;
  }
  button {
    font-family: "Lato", sans-serif;
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
  }
`;
const Nav1 = styled.div`
  img {
    margin-top: 20px;
  }
`;
const Nav2 = styled.div``;
const Mainline = styled.div`
  display: flex;
  flex-direction: column;
  margin: 150px auto auto auto;
  width: 50%;
  p {
    font-family: "Oswald", sans-serif;
    font-weight: 700;
    font-size: 43px;
    color: #ffffff;
    margin-bottom: 43px;
  }
  header {
    display: flex;
    flex-direction: row;
    height: 209px;
    background-color: #ffffff;
    border-radius: 5px;
    width: 80%;
  }
  input {
    font-family: "Lato", sans-serif;
    font-weight: 400;
    border: none;
    background-color: transparent;
    ::placeholder {
      font-family: "Lato", sans-serif;
      font-weight: 400;
      color: #707070;
    }
    margin: 20px 10px 10px 10px;
  }
  button {
    width: 112px;
    height: 31px;
    border-radius: 5px;
    background-color: #1877f2;
    &:hover {
      cursor: pointer;
    }
    img {
      size: 32px;
    }
  }
`;
const Div1 = styled.div`
  width: 50px;
  height: 50px;
  margin: 16px 18px auto 18px;
`;
const Div2 = styled.div`
  display: flex;
  flex-direction: column;
`;
const Div3 = styled.div`
  margin-left: 550px;
`;
