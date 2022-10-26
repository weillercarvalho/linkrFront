import { SharedContainer, SharedDetails } from '../styles/Common';
import { BiRepost } from 'react-icons/bi';
import styled from 'styled-components';
import { sharePost } from '../services/Services';

export function SharedPost({ shared, sharerName, sharerId, userId }) {
  return shared ? (
    <div>
      <SharedContainer>
        <SharedDetails>
          <div>
            <BiRepost />
          </div>
          {sharerId === userId ? (
            <span>
              Re-posted by <Boldify>you</Boldify>
            </span>
          ) : (
            <span>
              Re-posted by <Boldify>{sharerName}</Boldify>
            </span>
          )}
        </SharedDetails>
      </SharedContainer>
    </div>
  ) : (
    <></>
  );
}

export function NewSharePost({
  postId,
  removeShare,
  userId,
  loggedUserId,
  att,
  setAtt,
  reshareCount,
}) {
  return (
    <ShareContainer>
      <EnlargeIcon
        recolor={removeShare}
        onClick={() => {
          userId === loggedUserId
            ? window.alert('you cant share your own posts')
            : handleShare(postId, removeShare, att, setAtt);
        }}
      >
        <BiRepost />
      </EnlargeIcon>
      <span>{reshareCount} reposts</span>
    </ShareContainer>
  );
}

function handleShare(postId, removeShare, att, setAtt) {
  if (removeShare) {
    console.log('remove share');
    sharePost(postId, removeShare)
      .catch((e) => console.log(e))
      .then((e) => setAtt(!att));
  } else {
    console.log('new share');
    sharePost(postId, removeShare)
      .catch((e) => console.log(e))
      .then((e) => setAtt(!att));
  }
  return;
}

const Boldify = styled.span`
  font-weight: bold;
`;

const ShareContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  span {
    font-size: 12px;
  }
`;

const EnlargeIcon = styled.div`
  font-size: 34px;
  color: ${(props) => (props.recolor ? 'red' : 'inherit')};
`;
