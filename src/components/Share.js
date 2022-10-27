import { SharedContainer, SharedDetails } from '../styles/Common';
import { BiRepost } from 'react-icons/bi';
import styled from 'styled-components';
import { sharePost } from '../services/Services';
import { useNavigate } from 'react-router-dom';

export function SharedPost({ shared, sharerName, sharerId, userId }) {
  const navigate = useNavigate();
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
              Re-posted by{' '}
              <Boldify onClick={() => navigate(`/user/${sharerId}`)}>
                {sharerName}
              </Boldify>
            </span>
          )}
        </SharedDetails>
      </SharedContainer>
    </div>
  ) : (
    <></>
  );
}

export function NewSharePost({ removeShare, reshareCount }) {
  return (
    <ShareContainer>
      <EnlargeIcon recolor={removeShare}>
        <BiRepost />
      </EnlargeIcon>
      <span>{reshareCount} reposts</span>
    </ShareContainer>
  );
}

export function handleShare(postId, removeShare, att, setAtt) {
  if (removeShare) {
    console.log('remove share');
    sharePost(postId, removeShare)
      .catch((e) => console.log(e))
      .then((e) => {
        return setAtt(!att);
      });
  } else {
    sharePost(postId, removeShare)
      .catch((e) => console.log(e))
      .then((e) => {
        return setAtt(!att);
      });
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
  color: 'inherit';
`;
