import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {useEffect, useState } from 'react';

import { postSignin } from '../services/Services';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();


  
  useEffect(() => {
    const auth = localStorage.getItem(`token`);
    if (auth) {
      navigate('/timeline');
    }
  }, []);

  function handleForm(event) {
    event.preventDefault();

    if (email === '' || password === '') {
      return alert('fill all fields');
    }
    setDisabled(true);

    const body = {
      email: email,
      password: password,
    };
    postSignin(body)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        navigate('/timeline');
      })
      .catch((error) => {
        setDisabled(false);
        alert(error.response.data.error);
      });
  }

  return (
    <>
      <Container>
        <BlockOne>
          <Blocktext>
            <Titulo>Linkr</Titulo>
            <Text>save, share and discover the best links on the web</Text>
          </Blocktext>
        </BlockOne>

        <BlockTwo>
          <form onSubmit={handleForm}>
            <div>
              <Input
                placeholder="e-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              ></Input>
            </div>

            <div>
              <Input
                placeholder="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              ></Input>
            </div>

            {disabled === true ? (
              <Button type="submit" disabled={disabled}>
                <Loadder></Loadder>
              </Button>
            ) : (
              <Button type="submit" disabled={disabled}>
                Log in
              </Button>
            )}
          </form>
          <TxtCadastro onClick={() => navigate('/registered')}>
            First time? Create an account!
          </TxtCadastro>
        </BlockTwo>
      </Container>
    </>
  );
}

//font-family: 'Lato', sans-serif;
export const Loadder = styled.div`
  pointer-events: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #ffffff;
  animation: an1 0.8s ease infinite;

  @keyframes an1 {
    0% {
      tranform: rotate(0turn);
    }
    100% {
      transform: rotate(1turn);
    }
  }
`;

export const TxtCadastro = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: underline;
  width: 36vw;
  color: #ffffff;
  cursor: pointer;
  line-height: 20px;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
  @media (max-width: 400px) {
    font-size: 12px;
    width: 90vw;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36vw;
  height: 64px;
  background-color: #a328d6;
  border-radius: 5px;
  margin-bottom: 22px;
  font-size: 21px;
  color: #ffffff;
  box-sizing: border-box;
  cursor: pointer;

  @media (max-width: 400px) {
    width: 90vw;
    height: 9vh;
    margin-bottom: 10px;
  }
`;

export const Input = styled.input`
  font-family: 'Oswald', sans-serif;
  width: 36vw;
  height: 62px;
  margin-bottom: 10px;
  font-size: 20px;
  color: #262626;
  border-style: none;
  padding-left: 8px;
  border-radius: 5px;

  @media (max-width: 400px) {
    width: 90vw;
    height: 10vh;
    margin-bottom: 5.5px;
    font-size: 17px;
  }
`;

export const BlockTwo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  width: 40vw;
  height: 100%;
  background-color: #333333;

  @media (max-width: 400px) {
    width: 100vw;
    height: 65vh;
    justify-content: top;
    padding-top: 8px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

export const Titulo = styled.div`
  font-family: 'Passion One', cursive;
  width: 250px;
  font-weight: 700;
  font-size: 100px;
  font-weight: 700;
  color: #ffffff;

  @media (max-width: 400px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    margin-top: 10px;
    font-size: 76px;
  }
`;
export const Text = styled.div`
  font-family: 'Oswald', sans-serif;
  width: 40vw;
  font-weight: 700;
  font-size: 43px;
  font-weight: 400;
  line-height: 40px;
  color: #ffffff;
  word-wrap: break-word;

  @media (max-width: 400px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 74%;
    min-width: 237px;
    line-height: 25px;
    font-size: 23px;
  }
`;

export const Blocktext = styled.div`
  @media (max-width: 400px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 30vh;
    font-size: 23px;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const BlockOne = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 60vw;
  height: 100vh;
  background-color: black;

  @media (max-width: 400px) {
    width: 100%;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: black;

  @media (max-width: 400px) {
    width: 100%;
    height: 100vh;
  }
`;
