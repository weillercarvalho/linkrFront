import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import {
  postPost,
  getPost,
  getPicture,
  getLoggedUserId,
} from '../services/Services';
import { Mainline, Div1, Div2, Div3, BlankTimeline } from '../styles/Common';
import { useContainerDimensions } from '../hooks/getContainerDimensions';
import RenderSearchbar from '../components/Searchbar';
import RenderModal from '../components/Modal';
import Topper from '../components/Topper';
import Post from '../components/Post';

export default function Home() {
  const [url, setUrl] = useState('');
  const [post, setPost] = useState('');
  const [toggle, setToggle] = useState(false);
  const [datas, setDatas] = useState([]);
  const [att, setAtt] = useState(false);
  const [picture, setPicture] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loadDelete, setLoadDelete] = useState(false);
  const [userId, setUserId] = useState(0);

  const componentRef = useRef();
  const { width } = useContainerDimensions(componentRef);
  const windowRef = useRef();
  const windowWidth = useContainerDimensions(windowRef).width;

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
  return (
    <>
      <RenderModal
        att={att}
        setAtt={setAtt}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        loadDelete={loadDelete}
        setLoadDelete={setLoadDelete}
        mobile={windowWidth <= 375 ? true : false}
      />

      <Topper
        picture={picture}
        windowRef={windowRef}
        att={att}
        setAtt={setAtt}
      />

      <Mainline mobile={windowWidth <= 375 ? true : false}>
        {windowWidth > 375 ? (
          <></>
        ) : (
          <>
            {' '}
            <RenderSearchbar mobile={true} />
          </>
        )}

        {/* Components bellow? */}
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
        {/* Components above? */}
        <UpdatesTimeline mobile={windowWidth <= 375 ? true : false}>
          Teste teste teste teste teste
        </UpdatesTimeline>
        {loading ? (
          <>
            <Loading>Loading</Loading>{' '}
          </>
        ) : (
          <>
            {datas[0] ? (
              datas.map((value, index) => (
                <Post
                  key={index}
                  mobile={windowWidth <= 375 ? true : false}
                  profilePicture={value.picture}
                  link={value.link}
                  profileName={value.name}
                  message={value.message}
                  //isLiked={???}
                  //totalLikes={???}
                  postId={value.postId}
                  att={att}
                  setAtt={setAtt}
                  userId={value.userId}
                  loggedUserId={userId}
                  setModal={setModalIsOpen}
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

const Loading = styled.p`
  font-family: 'Lato', sans-serif !important;
  font-weight: 400;
  font-size: 30px;
`;

const UpdatesTimeline = styled.button`
  width: ${(mobile) => (mobile.mobile ? '100%' : '40%')} !important;
  min-width: ${(mobile) => (mobile.mobile ? '100%' : '500px')} !important;
  margin: ${(mobile) => (mobile.mobile ? '0' : '0 0 17px 25%')} !important;
  height: 61px !important;
  background-color: #1877f2;
  color: #ffffff;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 16px;
  margin: 40px auto 17px auto;
`