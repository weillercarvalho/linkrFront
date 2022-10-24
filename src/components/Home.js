import styled from 'styled-components';
import open from '../assets/images/Open.png';
import close from '../assets/images/Close.png';
import { useEffect, useRef, useState } from 'react';
import {
  postPost,
  getPost,
  getPicture,
  getSearchUsers,
  getLoggedUserId,
  deleteUserPost,
  updateUserPost,
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
  UpdateContainer,
  UpdatePost,
  DeletePost,
  DeleteButtom,
  CancelButtom,
  OptionsContainer,
  ModalTitle,
  ModalContent,
  AnimationContainer,
  EditForms,
  EditInput,
  Nav3,
} from './Common';
import { useContainerDimensions } from './functions/getContainerDimensions';
import { AiOutlineSearch, AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import Modal from 'react-modal';
import { Oval } from 'react-loader-spinner';
import TrendingTopics from './Trending';

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loadDelete, setLoadDelete] = useState(false);
  const [userId, setUserId] = useState(0);
  const navigate = useNavigate();
  const componentRef = useRef();
  const { width } = useContainerDimensions(componentRef);
  const windowRef = useRef();
  const windowWidth = useContainerDimensions(windowRef).width;
  const [logout, setLogout] = useState(false);
  function closeModal() {
    setModalIsOpen(false);
  }
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
    getLoggedUserId()
      .catch((r) => console.log(r))
      .then((r) => setUserId(r.data.userId));
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

  function getout() {
    localStorage.clear();
    window.location.replace('https://linkrfront.vercel.app/');
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={ModalStyle}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        {loadDelete ? (
          <AnimationContainer>
            <div>
              <Oval
                height={80}
                width={80}
                color="#ffffff"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#ffffff"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
            <div>Deleting</div>
          </AnimationContainer>
        ) : (
          <ModalContent>
            <ModalTitle>Are you sure you want to delete this post?</ModalTitle>
            <OptionsContainer>
              <CancelButtom
                onClick={(event) => {
                  event.preventDefault();
                  setModalIsOpen(false);
                }}
              >
                No, go back
              </CancelButtom>
              <DeleteButtom
                onClick={(event) => {
                  event.preventDefault();
                  setLoadDelete(!loadDelete);
                  deleteUserPost(modalIsOpen)
                    .catch((r) => {
                      console.log(r);
                      setLoadDelete(!loadDelete);
                      window.alert(
                        "There's been an error while deleting your post"
                      );
                      setModalIsOpen(false);
                    })
                    .then((r) => {
                      setLoadDelete(!loadDelete);
                      setModalIsOpen(false);
                      setAtt(!att);
                    });
                }}
              >
                Yes, delete it
              </DeleteButtom>
            </OptionsContainer>
          </ModalContent>
        )}
      </Modal>
      <Father ref={windowRef}>
        <nav mobile={windowWidth <= 375 ? true : false}>
          <p onClick={() => navigate('/timeline')}>linkr</p>
          {windowWidth <= 375 ? (
            <></>
          ) : (
            <>
              {' '}
              <SearchParent>
                <SearchBar mobile={true} bottom={!foundUsers[0]}>
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
                  <SearchResults mobile={true}>
                    {foundUsers.map((e, i) => {
                      return (
                        <SearchResult key={i}>
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
            </>
          )}
          <section>
            {logout ? (
              <>
                <Nav1>
                  <img src={close} onClick={() => setLogout(!logout)} alt="" />
                </Nav1>
                <Nav3 onClick={getout}>Logout</Nav3>
              </>
            ) : (
              <>
                <Nav1>
                  <img src={open} onClick={() => setLogout(!logout)} alt="" />
                </Nav1>
              </>
            )}
            <Nav2>
              <img src={picture} alt="" />
            </Nav2>
          </section>
        </nav>
      </Father>
      <Mainline mobile={windowWidth <= 375 ? true : false}>
        {windowWidth > 375 ? (
          <></>
        ) : (
          <>
            {' '}
            <SearchParent mobile={true}>
              <SearchBar mobile={true} bottom={!foundUsers[0]}>
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
                  {foundUsers.map((e, i) => {
                    return (
                      <SearchResult key={i}>
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
          </>
        )}
        <p mobile={windowWidth <= 375 ? true : false}>timeline</p>
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
                mobile={windowWidth}
                key={index}
                postId={value.postId}
                message={value.message}
                link={value.link}
                name={value.name}
                userId={value.userId}
                picture={value.picture}
                loggedUserId={userId}
                setModal={setModalIsOpen}
                att={att}
                setAtt={setAtt}
              />
            ))}
          </>
        )}
      </Mainline>
    </>
  );
}

function Posts({
  mobile,
  message,
  link,
  picture,
  name,
  userId,
  loggedUserId,
  postId,
  setModal,
  att,
  setAtt,
}) {
  const [edit, setEdit] = useState(message);
  const [shouldEdit, setShouldEdit] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newMessage, setNewMessage] = useState({});
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [shouldEdit]);

  useEffect(() => {
    if (submitted) {
      updateUserPost(newMessage)
        .catch((e) => {
          window.alert('Edit failed, try refreshing your page');
          setSubmitted(!submitted);
          setDisabled(!disabled);
        })
        .then((e) => {
          setSubmitted(!submitted);
          setDisabled(!disabled);
          setShouldEdit(!shouldEdit);
          setAtt(!att);
        });
    }
  }, [submitted]);

  if (!link) {
    alert(`There are no posts yet.`);
  }
  return (
    <Posting mobile={mobile.windowWidth <= 375 ? mobile.windowWidth : false}>
      <section>
        <img src={picture} alt="" />
        <nav>
          <span onClick={() => navigate(`/user/${userId}`)}>{name}</span>
          {shouldEdit ? (
            <EditForms
              onKeyUp={(e) => {
                if (e.code === 'Escape') {
                  setEdit(message);
                  setShouldEdit(!shouldEdit);
                }
              }}
              onSubmit={(event) => {
                event.preventDefault();
                if (edit !== message) {
                  setDisabled(!disabled);
                  setNewMessage({
                    message: edit,
                    postId: postId,
                  });
                  setSubmitted(!submitted);
                } else {
                  setShouldEdit(!shouldEdit);
                }
              }}
            >
              <EditInput
                ref={inputRef}
                disabled={disabled}
                onChange={(e) => setEdit(e.target.value)}
                defaultValue={edit}
              ></EditInput>
            </EditForms>
          ) : (
            <span>{message}</span>
          )}
          <div>
            <Microlink size="normal" url={link} direction="rtl" media="logo" />
          </div>
        </nav>
        {loggedUserId === userId ? (
          <UpdateContainer>
            <UpdatePost
              onClick={() => {
                if (!shouldEdit) {
                  setShouldEdit(!shouldEdit);
                  setEdit(message);
                }
                setShouldEdit(!shouldEdit);
              }}
            >
              <FiEdit2 />
            </UpdatePost>
            <DeletePost onClick={() => setModal(postId)}>
              <AiOutlineDelete />
            </DeletePost>
          </UpdateContainer>
        ) : (
          <></>
        )}
      </section>
    </Posting>
  );
}

const Loading = styled.p`
  font-family: 'Lato', sans-serif !important;
  font-weight: 400;
  font-size: 30px;
`;

const ModalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '8px',
    backgroundColor: '#333333',
  },
};
