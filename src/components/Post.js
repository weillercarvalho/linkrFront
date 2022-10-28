import Microlink from "@microlink/react";
import { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postLike, deleteLike } from "../services/Services";
import {
  DeletePost,
  ShareButtom,
  UpdateContainer,
  UpdatePost,
} from "../styles/Common";
import RenderMessage from "./Message";
import { NewSharePost, SharedPost } from "./Share";
import { AiOutlineComment } from "react-icons/ai";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { getComments, postComment } from "../services/Services";
import BlockComment from "./BlockComment.js";

let liked = false;
let showComents = false;

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
  setShareModal,
  shared,
  sharerId,
  sharerName,
  originalUserId,
  reshareCount,
  setShareParameters,
}) {
  liked = isLiked;

  const [shouldEdit, setShouldEdit] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [sendMessage, setSendMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  showComents = showComments;

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

  useEffect(() => {
    setShowComments(!showComments);
    getComments(postId)
      .then((resp) => {
        setComments(resp.data);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, [disabled]);

  const body = {
    comment: sendMessage,
  };

  function insertComments() {
    postComment({ userId, postId, body })
      .then((resp) => {
        setDisabled(!disabled);
        setSendMessage("");
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }

  return (
    <>
      <Posts mobile={mobile} shared={shared}>
        <ContainerConteudo>
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
                onClick={() => (originalUserId ? "" : disliker(postId))}
                name="heart-sharp"
              ></ion-icon>
            ) : (
              <ion-icon
                onClick={() => (originalUserId ? "" : liker(postId))}
                name="heart-outline"
              ></ion-icon>
            )}

            <h6>{totalLikes} likes</h6>
            <ButtonComment
              onClick={() => {
                setDisabled(!disabled);
              }}
            >
              <AiOutlineComment style={{ fontSize: 28 }} />
            </ButtonComment>
            <h6> {comments.length} comments</h6>
            <ShareButtom
              onClick={() => {
                const originalPosterId = originalUserId
                  ? originalUserId
                  : userId;
                if (originalPosterId === loggedUserId) {
                  window.alert("you cant share your own posts/reposts");
                } else if (userId === loggedUserId) {
                  window.alert("you cant share your own posts/reposts");
                } else {
                  if (!originalUserId) {
                    setShareModal(postId);
                    const removeShare = shared && sharerId === loggedUserId;
                    setShareParameters([postId, removeShare, att, setAtt]);
                  } else {
                    window.alert("You cant share reposts");
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
              onClick={() => {
                const navigateId = originalUserId ? originalUserId : userId;
                navigate(`/user/${navigateId}`);
              }}
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
                size={mobile ? "small" : "normal"}
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
        </ContainerConteudo>
        {Comments ? (
          <Comments>
            {comments.map((value) => (
              <BlockComment
                message={value.message}
                profilePicture={value.picture}
                name={value.name}
                idUserComment={value.idUserComment}
                userId={userId}
              />
            ))}
          </Comments>
        ) : (
          "loading"
        )}
        <SendMessage>
          <Img src={profilePicture} alt="" />
          <Form>
            <Input
              style={{ fontSize: 13, margin: 0 }}
              placeholder="write a comment..."
              value={sendMessage}
              onChange={(event) => setSendMessage(event.target.value)}
            ></Input>
            <IoPaperPlaneOutline
              onClick={insertComments}
              style={{
                fontSize: 24.5,
                borderStyle: "none",
                marginLeft: 5,
              }}
            />
          </Form>
        </SendMessage>
      </Posts>
    </>
  );
}

const Img = styled.img`
  width: 39px;
  min-height: 39px;
  margin-right: 14px;
  border-radius: 50%;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #252525;
  font-size: 10px;
  padding: 0 1vh;
  border-radius: 8px;
`;

const SendMessage = styled.div`
  display: ${() => (showComents ? "none" : "flex")};
  height: 60px;
  padding: 2vh;
`;

const Comments = styled.div`
  display: ${() => (showComents ? "none" : "")};
`;

const Input = styled.input`
  color: #ffffff;
  width: 95%;
  outline-style: none;
  background-color: #ffffff;
  border-style: none;
`;

const ContainerConteudo = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: auto;
  background-color: #171717;
  padding: 2vh 1vw;
  font-size: 20px;
  border-radius: 16px;
`;

const ButtonComment = styled.div`
  margin-top: 2vh;
`;

const Posts = styled.div`
  position: relative;
  width: ${(mobile) => (mobile.mobile ? "100%" : "40vw")};
  height: auto;
  max-height: 600px;
  overflow: scroll;
  min-width: ${(mobile) => (mobile.mobile ? "100%" : "500px")};
  margin: ${(mobile) =>
    mobile.mobile
      ? "15px 0 0 0"
      : mobile.shared
      ? "35px 0 0 25%"
      : "10px 0 0 25%"};

  background-color: #1e1e1e;
  border-radius: 16px;
  margin-bottom: 2vh;
  display: flex;
  flex-direction: column;

  font-size: 20px;
  color: #ffffff;
  z-index: 0;
`;
const PictureLikes = styled.div`
  width: 65px;
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
    color: ${(props) => (liked ? "#AC0000" : "#ffffff")};
    cursor: pointer;
    margin-top: 2vh;
  }

  h6 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    width: 67px;
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
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #ffffff;
    margin: 0 0 12px 0;
  }

  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #b7b7b7;
    margin: 1vh 0;
  }
  a {
    font-family: "Lato";
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
