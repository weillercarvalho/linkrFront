import styled from "styled-components";
import open from "../assets/images/Open.png";
import oldman from "../assets/images/image 3.png";
import { useEffect, useState } from "react";
import { postPost, getPost } from "../services/Services";
export default function Home() {
  const [url,setUrl] = useState("");
  const [post,setPost] = useState("");
  const [toggle,setToggle] = useState(false);
  const [datas,setDatas] = useState([]);
  const [att,setAtt] = useState(false);
  
  useEffect(() => {
    getPost().catch((r) => {
      console.log(r)
    })
    .then((r) => {
      setDatas(r.data)
    })
  },[att])
  
  function handlepost(e) {
    e.preventDefault(e);
    setToggle(!toggle);
    const body = {
      message: post,
      link: url
    };
    postPost(body).then((r) => {
      console.log(r);
      setPost("");
      setUrl("");
      setToggle(false);
      setAtt(!att);
    })
    .catch((r) => {
      console.log(r);
      alert(`Houve um erro ao publicar seu link`);
      setToggle(false);
    })
  }
  
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
          <form onSubmit={handlepost}>
            <Div2>
              <label htmlFor="url">What are you going to share today?</label>
              {toggle ? <input id="url" type="url" name="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="http://..." disabled></input> : <input id="url" type="url" name="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="http://..." required></input>}
              <label htmlFor="text"></label>
              {toggle ? <input type="text" id="text" name="text" value={post} onChange={(e) => setPost(e.target.value)} placeholder="Awesome article about #javascript" disabled></input> : <input type="text" id="text" name="text" value={post} onChange={(e) => setPost(e.target.value)} placeholder="Awesome article about #javascript"></input>}
            </Div2>
            <Div3>
              {toggle ? <button disabled>Publishing</button> : <button>Publish</button>}
            </Div3>
          </form>
        </header>
        {datas.map((value,index) => (<Posts key={index} message={value.message} link={value.link}/>))}
      </Mainline>
    </>
  );
}

function Posts({message,link}) {
  return (
    <Posting>      
      <section>
        <img src={oldman} alt=""/>
        {message}
        {link}
      </section>
    </Posting>
  )



}

const Posting = styled.div`
  display:flex;
  flex-direction: column;
  section {
    display: flex;
    flex-direction: row;
    height: 209px;
    background-color: #171717;
    border-radius: 16px;
    width: 80%;
    margin-bottom: 29px;
    color: #b7b7b7;
  }
`

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
    border-radius: 16px;
    width: 80%;
    margin-bottom: 29px;
  }
  input {
    font-family: "Lato", sans-serif;
    font-weight: 400;
    border: none;
    background-color: transparent;
    font-size: 17px;
    ::placeholder {
      font-family: "Lato", sans-serif;
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
    font-family: "Lato", sans-serif;
    font-weight: 700;
    color: #ffffff;
    &:hover {
      cursor: pointer;
    }
    img {
      size: 32px;
    }
  }
  label {
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #707070;
    margin: 10px;
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
