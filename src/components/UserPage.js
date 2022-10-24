import styled from 'styled-components';
import open from '../assets/images/Open.png';
import { useEffect, useRef, useState } from 'react';
import {
  getUserData,
  getPicture,
  getUserPosts,
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
  Posting,
  SearchBar,
  SearchParent,
  SearchResults,
  SearchResult,
  SearchImg,
  UsernameTitle,
  BlankTimeline,
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
} from './Common';
import { AiOutlineSearch, AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { BsQuestion } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import Modal from 'react-modal';
import { Oval } from 'react-loader-spinner';
import { useContainerDimensions } from './functions/getContainerDimensions';

export default function UserPage() {
  const [url, setUrl] = useState('');
  const [post, setPost] = useState('');
  const [toggle, setToggle] = useState(false);
  const [datas, setDatas] = useState([]);
  const [userDatas, setUserDatas] = useState([]);
  const [recievedUser, setRecievedUser] = useState(false);
  const [att, setAtt] = useState(false);
  const [picture, setPicture] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchParameter, setSearchParemeter] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);
  const [userId, setUserId] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loadDelete, setLoadDelete] = useState(false);
  const windowRef = useRef();
  const windowWidth = useContainerDimensions(windowRef).width;
  const params = useParams();
  const navigate = useNavigate();

  function closeModal() {
    setModalIsOpen(false);
  }

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
  useEffect(() => {
    getUserData(params)
      .catch((r) => {
        console.log(r);
        if (!userDatas[0]) {
          navigate('/error');
        }
      })
      .then((r) => {
        setUserDatas(r.data);
        setRecievedUser(true);
      });
  }, [recievedUser, att, userId]);

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
    getUserPosts(params)
      .catch((r) => {
        console.log(r);
      })
      .then((r) => {
        setDatas(r.data.userPosts);
      });
  }, [att]);
  return (
    <>
    {console.log(datas)}
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
                <SearchBar mobile={false} bottom={!foundUsers[0]}>
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
        <UsernameTitle mobile={windowWidth <= 375 ? true : false}>
          <div>
            <img src={userDatas.picture} alt="" />
          </div>
          <div>
            {userDatas.name ? `${userDatas.name}'s posts` : 'User not found'}
          </div>
        </UsernameTitle>
        {loading ? (
          <>
            <Loading>Loading</Loading>{' '}
          </>
        ) : (
          <>
            {datas[0] ? (
              datas.map((value, index) => (
                <Posts
                  mobile={windowWidth <= 375 ? true : false}
                  key={index}
                  message={value.Message}
                  link={value.Link}
                  name={value.Username}
                  userId={Number(params.userId)}
                  picture={value.Avatar}
                  loggedUserId={userId}
                  postId={value.PostId}
                  setModal={setModalIsOpen}
                  att={att}
                  setAtt={setAtt}
                />
              ))
            ) : (
              <BlankTimeline>
                <div>empty timeline</div>
              </BlankTimeline>
            )}
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
    <Posting>
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
            <Microlink
              size={mobile ? 'small' : 'normal'}
              url={link}
              direction="rtl"
            />
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
    'border-radius': '8px',
    'background-color': '#333333',
  },
};
