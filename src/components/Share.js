import { SharedContainer, SharedDetails } from '../styles/Common';
import { BiRepost } from 'react-icons/bi';
import styled from 'styled-components';

export function SharedPost({ shared, sharerName, sharerId, userId }) {
  return shared ? (
    <div>
      <SharedContainer>
        <SharedDetails>
          <BiRepost />
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

export function NewSharePost({ postId, removeShare, userId, loggedUserId }) {
  return (
    <ShareContainer>
      <EnlargeIcon
        onClick={() => {
          userId === loggedUserId
            ? console.log('you cant share your own posts')
            : handleShare(postId, removeShare);
        }}
      >
        <BiRepost />
      </EnlargeIcon>
      <span>X reposts</span>
    </ShareContainer>
  );
}

function handleShare(postId, removeShare) {
  console.log('share this post: ', postId);
  if (removeShare) {
    console.log('remove share? ', removeShare);
  } else {
    console.log('share? ', !removeShare);
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
`;
