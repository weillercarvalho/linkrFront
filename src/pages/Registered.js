import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import {
  Container,
  Input,
  TxtCadastro,
  Button,
  BlockTwo,
  BlockOne,
  Blocktext,
  Titulo,
  Text,
  Loadder,
} from './Login';

import { postSignup } from '../services/Services';

export default function Registered() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
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

    if (name === '' || email === '' || password === '' || picture === '') {
      return alert('fill all fields');
    }

    setDisabled(true);

    const body = {
      name: name,
      email: email,
      password: password,
      picture: picture,
    };
    postSignup(body)
      .then((resposta) => {
        localStorage.setItem('picture', picture);
        alert('registered user');
        navigate('/');
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
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              ></Input>
            </div>
            <div>
              <Input
                placeholder="username"
                value={name}
                onChange={(event) => setName(event.target.value)}
              ></Input>
            </div>
            <div>
              <Input
                placeholder="picture url"
                value={picture}
                onChange={(event) => setPicture(event.target.value)}
              ></Input>
            </div>
            <Button type="submit" disabled={disabled}>
              {disabled === true ? <Loadder></Loadder> : 'Sign Up'}
            </Button>

            <TxtCadastro onClick={() => navigate('/')}>
              Switch back to log in
            </TxtCadastro>
          </form>
        </BlockTwo>
      </Container>
    </>
  );
}
