import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHashtagPosts } from '../services/Services';
import TrendingTopics from '../components/Trending';
import Topper from '../components/Topper';
import Post from '../components/Post';
import { Title, Organizer } from '../styles/Common';

export default function HashtagPage() {
  const [hashtagPostList, SetHashitagPostList] = useState([]);
  const { hashtag } = useParams();

  function renderHashtagsPosts() {
    SetHashitagPostList([]);
    getHashtagPosts(hashtag)
      .catch((r) => {
        console.log(r);
      })
      .then((r) => {
        return SetHashitagPostList(r.data);
      });
  }

  useEffect(renderHashtagsPosts, [hashtag]);

  return (
    <>
      <Topper />
      <Title>
        {hashtagPostList.length < 1 ? (
          ' '
        ) : (
          <h1>{hashtagPostList[0].hashtag}</h1>
        )}
      </Title>
      <Organizer>
        <div className="principalColumn">
          {hashtagPostList.length < 1
            ? ' '
            : hashtagPostList.map((value, index) => (
                <Post
                  key={index}
                  profilePicture={value.picture}
                  link={value.link}
                  profileName={value.name}
                  message={value.message}
                  isLiked={value.isLiked}
                  totalLikes={value.totalLikes}
                  postId={value.id}
                  att={renderHashtagsPosts}
                />
              ))}
        </div>
        {hashtagPostList.length < 1 ? ' ' : <TrendingTopics />}
      </Organizer>
    </>
  );
}
