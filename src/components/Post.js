import Microlink from '@microlink/react';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { postLike, deleteLike } from '../services/Services';
import {
  DeletePost,
  ShareButtom,
  UpdateContainer,
  UpdatePost,
} from '../styles/Common';
import RenderMessage from './Message';
import { handleShare, NewSharePost, SharedPost } from './Share';

let liked = false;
export default function Post({
  mobile,
  profilePicture,
  link,
  profileName,
  message,
  isLiked,
  totalLikes,
  postId,
  att,
  setAtt,
  userId,
  loggedUserId,
  setModal,
  shared,
  sharerId,
  sharerName,
  originalUserId,
  reshareCount,
}) {
  liked = isLiked;

  const [shouldEdit, setShouldEdit] = useState(false);
  const navigate = useNavigate();

  function liker(id) {
    postLike(id)
      .catch((r) => {
        console.log(r);
      })
      .then((r) => {
        return setAtt(!att);
      });
  }

  function disliker(id) {
    deleteLike(id)
      .catch((r) => {
        console.log(r);
      })
      .then((r) => {
        return setAtt(!att);
      });
  }

  return (
    <>
      <Posts mobile={mobile} shared={shared}>
        <SharedPost
          shared={shared}
          sharerName={sharerName}
          sharerId={sharerId}
          userId={loggedUserId}
        />
        <PictureLikes>
          <img src={profilePicture} alt="" />

          {isLiked ? (
            <ion-icon
              onClick={() => (originalUserId ? '' : disliker(postId))}
              name="heart-sharp"
            ></ion-icon>
          ) : (
            <ion-icon
              onClick={() => (originalUserId ? '' : liker(postId))}
              name="heart-outline"
            ></ion-icon>
          )}

          <h6>{totalLikes} likes</h6>
          <ShareButtom
            onClick={() => {
              const originalPosterId = originalUserId ? originalUserId : userId;
              if (originalPosterId === loggedUserId) {
                window.alert('you cant share your own posts');
              } else {
                if (!originalUserId) {
                  const removeShare = shared && sharerId === loggedUserId;
                  console.log(att);
                  setAtt(handleShare(postId, removeShare, att, setAtt));
                  console.log(att);
                }
              }
            }}
          >
            <NewSharePost
              postId={postId}
              removeShare={shared && sharerId === loggedUserId}
              userId={originalUserId ? originalUserId : userId}
              loggedUserId={loggedUserId}
              att={att}
              setAtt={setAtt}
              reshareCount={reshareCount}
            />
          </ShareButtom>
        </PictureLikes>

        <Content>
          <h3
            onClick={() =>
              navigate(`/user/${originalUserId ? originalUserId : userId}`)
            }
          >
            {profileName}
          </h3>
          <RenderMessage
            message={message}
            att={att}
            setAtt={setAtt}
            postId={postId}
            shouldEdit={shouldEdit}
            setShouldEdit={setShouldEdit}
          />

          <MicroLinkContainer mobile={mobile}>
            <Microlink
              size={mobile ? 'small' : 'normal'}
              url={link}
              direction="rtl"
            />
          </MicroLinkContainer>
        </Content>
        {loggedUserId === userId && !shared ? (
          <UpdateContainer>
            <UpdatePost
              onClick={() => {
                if (!shouldEdit) {
                  setShouldEdit(!shouldEdit);
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
      </Posts>
    </>
  );
}

const Posts = styled.div`
  position: relative;
  width: ${(mobile) => (mobile.mobile ? '100%' : '40vw')};
  height: auto;
  min-width: ${(mobile) => (mobile.mobile ? '100%' : '500px')};
  margin: ${(mobile) =>
    mobile.mobile
      ? '15px 0 0 0'
      : mobile.shared
      ? '35px 0 0 25%'
      : '10px 0 0 25%'};
  background-color: #171717;
  border-radius: 16px;
  margin-bottom: 2vh;
  display: flex;
  padding: 2vh 1vw;
  font-size: 20px;
  color: #ffffff;
  z-index: 0;
`;
const PictureLikes = styled.div`
  width: 50px;
  height: auto;
  margin-right: 1vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 20px;
  }
  ion-icon {
    font-size: 29px;
    color: ${(props) => (liked ? '#AC0000' : '#ffffff')};
    cursor: pointer;
    margin-top: 2vh;
  }

  h6 {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    color: #ffffff;
    margin-top: 0.25vh;
  }
`;

const Content = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;

  h3 {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #ffffff;
    margin: 0 0 12px 0;
  }

  p {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #b7b7b7;
    margin: 1vh 0;
  }
  a {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #b7b7b7;
  }
`;

const MicroLinkContainer = styled.div`
  .microlink_card {
    margin: 30px 0 0 0;
    min-width: 90%;
    height: 90%;
    border-radius: 8px;
    width: calc(40vw - 10rem);
    @media (max-width: 375px) {
      width: 80%;
      height: 60%;

      img {
        object-fit: cover;
      }

      .microlink_card__content_title {
        background-color: transparent;
        margin: 0;
      }

      .microlink_card__content_url {
        margin: 0;
      }

      .microlink_card__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
      }
    }
  }

  box-sizing: border-box;
  --microlink-background-color: #151515;
  --microlink-color: #ffffff;
  --microlink-border-radius: 5px;
  --microlink-hover-background-color: #151515;
  --microlink-font-size: 20px;
`;
