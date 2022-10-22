import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './Context';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { token } = useContext(UserContext);

  useEffect(() => {
    if (token) {
      navigate('/timeline');
    }
  }, []);

  function handleForm(event) {
    event.preventDefault();

    if (email === '' || password === '') {
      return alert('fill all fields');
    }

    const body = {
      email: email,
      password: password,
    };

    axios
      .post('http://localhost:5000/signin', body)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        navigate('/timeline');
      })
      .catch((error) => {
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

            <Button type="submit">Log in</Button>
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

export const TxtCadastro = styled.div`
  display: flex;
  justify-content: center;
  text-decoration: underline;
  color: #ffffff;
  cursor: pointer;
  line-height: 22.5px;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
`;

export const Button = styled.button`
  width: 35vw;
  height: 65px;
  background-color: #a328d6;
  border-radius: 5px;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  box-sizing: border-box;
  cursor: pointer;
  border-style: hidden;
`;

export const Input = styled.input`
  font-family: 'Oswald', sans-serif;
  width: 35vw;
  height: 65px;
  margin-bottom: 13px;
  font-size: 20px;
  color: #262626;
  padding-left: 8px;
  border-radius: 5px;
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
`;

export const Titulo = styled.h1`
  font-family: 'Passion One', cursive;
  width: 250px;
  font-weight: 700;
  font-size: 100px;
  font-weight: 700;
  color: #ffffff;
`;
export const Text = styled.h1`
  font-family: 'Oswald', sans-serif;
  width: 40vw;
  font-weight: 700;
  font-size: 43px;
  font-weight: 400;
  color: #ffffff;
  word-wrap: break-word;
`;

export const Blocktext = styled.div``;

export const BlockOne = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 60vw;
  height: 100%;
  background-color: black;
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
`;
