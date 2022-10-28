import styled from 'styled-components';

export default function FollowButtom({ userId, follows = false }) {
  return (
    <>
      <Follow
        followed={follows}
        onClick={() => {
          if (follows) {
            console.log('Unfollow user: ', userId);
          } else {
            console.log('Follow user: ', userId);
          }
        }}
      >
        <div>{follows ? 'Unfollow' : 'Follow'}</div>
      </Follow>
    </>
  );
}

const Follow = styled.div`
  position: relative;
  left: 50%;
  background-color: ${({ followed }) => (followed ? '#FFFFFF' : '#1877F2')};
  color: ${({ followed }) => (followed ? '#1877F2' : '#FFFFFF')};
  width: 130px;
  height: 35px;
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 8px;

  div {
    margin: 0;
  }
`;
