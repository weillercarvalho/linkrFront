import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import {
  getUserData,
  getPicture,
  getUserPosts,
  getLoggedUserId,
} from '../services/Services';
import { Mainline, UsernameTitle, BlankTimeline } from '../styles/Common';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useContainerDimensions } from '../hooks/getContainerDimensions';
import RenderSearchbar from '../components/Searchbar';
import Topper from '../components/Topper';
import Post from '../components/Post';
import RenderModal from '../components/Modal';
import RenderShareModal from '../components/ShareModal';

export default function UserPage() {
  const [datas, setDatas] = useState([]);
  const [userDatas, setUserDatas] = useState([]);
  const [recievedUser, setRecievedUser] = useState(false);
  const [att, setAtt] = useState(false);
  const [picture, setPicture] = useState({});
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);
  const [loadDelete, setLoadDelete] = useState(false);
  const [loadShare, setLoadShare] = useState(false);
  const [shareParameters, setShareParameters] = useState();
  const windowRef = useRef();
  const windowWidth = useContainerDimensions(windowRef).width;
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

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
    getUserPosts(params)
      .catch((r) => {
        console.log(r);
      })
      .then((r) => {
        setDatas(r.data);
      });
  }, [att, location.state]);

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
      <RenderShareModal
        att={att}
        setAtt={setAtt}
        modalIsOpen={shareModalIsOpen}
        setShareModalIsOpen={setShareModalIsOpen}
        loadDeleteShare={loadShare}
        setLoadShare={setLoadShare}
        mobile={windowWidth <= 375 ? true : false}
        shareParameters={shareParameters}
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
            <RenderSearchbar mobile={true} />
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
                <Post
                  key={index}
                  mobile={windowWidth <= 375 ? true : false}
                  profilePicture={value.Avatar}
                  link={value.Link}
                  profileName={value.Username}
                  message={value.Message}
                  isLiked={value.isLiked}
                  totalLikes={value.totalLikes}
                  postId={value.PostId}
                  att={att}
                  setAtt={setAtt}
                  userId={Number(params.userId)}
                  loggedUserId={userId}
                  setModal={setModalIsOpen}
                  setShareModal={setShareModalIsOpen}
                  shared={value.shared}
                  sharerId={null || value.SharerId}
                  sharerName={null || value.SharerName}
                  originalUserId={null || value.OriginalUserId}
                  reshareCount={value.reshareCount}
                  setShareParameters={setShareParameters}
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
