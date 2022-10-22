import styled from 'styled-components';
import open from '../assets/images/Open.png';
import { useEffect, useRef, useState } from 'react';
import {
  postPost,
  getPost,
  getPicture,
  getSearchUsers,
} from '../services/Services';
import Microlink from '@microlink/react';
import {
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
} from './Common';
import { useContainerDimensions } from './functions/getContainerDimensions';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';

export default function Home() {
  const [url, setUrl] = useState('');
  const [post, setPost] = useState('');
  const [toggle, setToggle] = useState(false);
  const [datas, setDatas] = useState([]);
  const [att, setAtt] = useState(false);
  const [picture, setPicture] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchParameter, setSearchParemeter] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);
  const navigate = useNavigate();
  const componentRef = useRef();
  const { width } = useContainerDimensions(componentRef);
  
  
  useEffect(() => {
    getPost()
      .catch((r) => {
        console.log(r);
      })
      .then((r) => {
        setDatas(r.data);
      });
  }, [att]);

  useEffect(() => {
    if (searchParameter.length > 2) {
      getSearchUsers(searchParameter)
        .catch((e) => console.log(e))
        .then((e) => setFoundUsers(e.data));
    } else {
      setSearchParemeter('');
    }
  }, [searchParameter]);

  useEffect(() => {
    getPicture()
      .catch((r) => {
        console.log(r);
      })
      .then((r) => {
        setPicture(r.data.picture);
      });
  }, []);

  function handlepost(e) {
    if (loading === false) {
      setLoading(true);
      e.preventDefault(e);
      setToggle(!toggle);
      const body = {
        message: post,
        link: url,
      };
      postPost(body)
        .then((r) => {
          console.log(r);
          setPost('');
          setUrl('');
          setToggle(false);
          setAtt(!att);
          setLoading(false);
        })
        .catch((r) => {
          console.log(r);
          alert(`Houve um erro ao publicar seu link`);
          setToggle(false);
          setLoading(false);
        });
    }
  }

  return (
    <>
      <Father>
        <nav>
          <p>linkr</p>
          <SearchParent>
            <SearchBar bottom={!foundUsers[0]}>
              <div>
                <DebounceInput
                  minLength={2}
                  debounceTimeout={300}
                  onChange={(event) => {
                    if (event.target.value.length > 2) {
                      setSearchParemeter(event.target.value);
                    } else {
                      setSearchParemeter('');
                      setFoundUsers([]);
                    }
                  }}
                  placeholder={'Search for people'}
                />
              </div>
              <div>
                <AiOutlineSearch />
              </div>
            </SearchBar>
            {!foundUsers[0] ? (
              <></>
            ) : (
              <SearchResults>
                {foundUsers.map((e) => {
                  return (
                    <SearchResult>
                      <SearchImg src={e.picture} alt="alt" />
                      <div
                        onClick={() => {
                          navigate(`/user/${e.id}`);
                          setFoundUsers([]);
                          setAtt(!att);
                        }}
                      >
                        {e.name}
                      </div>
                    </SearchResult>
                  );
                })}
              </SearchResults>
            )}
          </SearchParent>
          <section>
            <Nav1>
              <img src={open} alt="" />
            </Nav1>
            <Nav2>
              <img src={picture} alt="" />
            </Nav2>
          </section>
        </nav>
      </Father>
      <Mainline>
        <p>timeline</p>
        <header ref={componentRef}>
          <Div1>
            <img src={picture} alt="" />
          </Div1>
          <form onSubmit={handlepost}>
            <Div2>
              <label htmlFor="url">What are you going to share today?</label>
              {toggle ? (
                <input
                  id="url"
                  type="url"
                  name="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="http://..."
                  disabled
                ></input>
              ) : (
                <input
                  id="url"
                  type="url"
                  name="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="http://..."
                  required
                ></input>
              )}
              <label htmlFor="text"></label>
              {toggle ? (
                <input
                  type="text"
                  id="text"
                  name="text"
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  placeholder="Awesome article about #javascript"
                  disabled
                ></input>
              ) : (
                <input
                  type="text"
                  id="text"
                  name="text"
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  placeholder="Awesome article about #javascript"
                ></input>
              )}
            </Div2>
            <Div3 horizontal={width}>
              {toggle ? (
                <button disabled>Publishing</button>
              ) : (
                <button>Publish</button>
              )}
            </Div3>
          </form>
        </header>
        {loading ? (
          <>
            <Loading>Loading</Loading>{' '}
          </>
        ) : (
          <>
            {datas.map((value, index) => (
              <Posts
                key={index}
                message={value.message}
                link={value.link}
                name={value.name}
                userId={value.userId}
                picture={picture}
              />
            ))}
          </>
        )}
      </Mainline>
    </>
  );
}

function Posts({ message, link, picture, name, userId }) {
  const navigate = useNavigate();
  if (!link) {
    alert(`There are no posts yet.`);
  }
  return (
    <Posting>
      <section>
        <img src={picture} alt="" />
        <nav>
          <span onClick={() => navigate(`/user/${userId}`)}>{name}</span>
          <span>{message}</span>
          <div>
              <Microlink url={link} direction="rtl" size='normal' media='logo'/>            
          </div>
        </nav>
      </section>
    </Posting>
  );
}

const Loading = styled.p`
  font-family: 'Lato', sans-serif !important;
  font-weight: 400;
  font-size: 30px;
`;
