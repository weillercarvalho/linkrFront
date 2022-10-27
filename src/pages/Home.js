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
import circle from '../assets/images/Vector.png';
import useInterval from 'use-interval';
import InfiniteScroll from 'react-infinite-scroller';

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
  const [size, setSize] = useState([]);
  const [count, setCount] = useState(0);

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

  useInterval(() => {
    if (size.length - datas.length === 0 || size.length - datas.length < 0) {
      return setCount(0);
    } else if (size.length - datas.length !== 0) {
      return setCount(size.length - datas.length);
    }
  }, 15000);

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

  function loadingmore() {
    return datas.splice(10);
  }

  function handlepost(e) {
    if (loading === false) {
      setLoading(true);
      e.preventDefault(e);
      setToggle(!toggle);

      const hashtags = [];
      let aux = post.split(" ");
      for (let index = 0; index < aux.length; index++) {
        const element = aux[index];
        if(element[0] === '#'){
          hashtags.push(element)
        };  
      };
      console.log(aux, " ", hashtags);
      const body = {
        message: post,
        link: url,
        hashtags: hashtags,
      };
      postPost(body)
        .then((r) => {
          setSize(r.data);
          //console.log(r);
          setPost('');
          setUrl('');
          setToggle(false);
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
        {count === 0 ? (
          <>
            <UpdatesTimeline
              onClick={() => setAtt(!att)}
              mobile={windowWidth <= 375 ? true : false}
            >
              {count} new posts!
            </UpdatesTimeline>
          </>
        ) : (
          <>
            <UpdatesTimeline
              onClick={() => setAtt(!att)}
              mobile={windowWidth <= 375 ? true : false}
            >
              {count} new posts, load more! <img src={circle} alt="" />
            </UpdatesTimeline>
          </>
        )}
        {loading ? (
          <>
            <Loading>Loading</Loading>{' '}
          </>
        ) : (
          <>
            <InfiniteScroll
              pageStart={0}
              loadMore={loadingmore}
              hasMore={true}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
            >
              {datas[0] ? (
                datas.map((value, index) => (
                  <Post
                    key={index}
                    mobile={windowWidth <= 375 ? true : false}
                    profilePicture={value.picture}
                    link={value.link}
                    profileName={value.name}
                    message={value.message}
                    isLiked={value.isLiked}
                    totalLikes={value.totalLikes}
                    postId={value.postId}
                    att={att}
                    setAtt={setAtt}
                    userId={value.userId}
                    loggedUserId={userId}
                    setModal={setModalIsOpen}
                    shared={value.shared}
                    sharerId={null || value.SharerId}
                    sharerName={null || value.SharerName}
                    originalUserId={null || value.OriginalUserId}
                    reshareCount={value.reshareCount}
                  />
                ))
              ) : (
                <BlankTimeline>
                  <div>empty timeline</div>
                </BlankTimeline>
              )}
            </InfiniteScroll>
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
  position: ${(mobile) => (mobile.mobile ? 'fixed' : 'none')} !important;
  top: ${(mobile) => (mobile.mobile ? '500px' : 'none')} !important;
  left: ${(mobile) => (mobile.mobile ? '40px' : 'none')} !important;
  width: ${(mobile) => (mobile.mobile ? '40%' : '40%')} !important;
  min-width: ${(mobile) => (mobile.mobile ? '80%' : '500px')} !important;
  margin: ${(mobile) => (mobile.mobile ? '0' : '0 0 17px 25%')} !important;
  height: 61px !important;
  background-color: #1877f2;
  color: #ffffff;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 16px;
  margin: 40px auto 17px auto;
  img {
    width: 22px !important;
    height: 16px !important;
    margin-left: 5px;
  }
`;
