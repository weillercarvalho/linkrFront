import axios from 'axios';

//const BASE_URL = `https://linkr-project-backend.herokuapp.com`;
const BASE_URL = `http://localhost:5000`; //for local testing
const authToken = localStorage.getItem('token');

function creatingHeaders() {
  const auth = localStorage.getItem('token');
  const header = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
  return header;
}

function postPost(body) {
  const header = creatingHeaders();
  const promise = axios.post(`${BASE_URL}/timeline`, body, header);
  return promise;
}

function getPost(offset) {
  const header = creatingHeaders();
  const promise = axios.get(`${BASE_URL}/timeline?limit=10&offset=${offset}`, header);
  return promise;
}

function getPicture() {
  const promise = axios.get(`${BASE_URL}/picture`);
  return promise;
}

function getUserPosts({ userId }) {
  const promise = axios.get(`${BASE_URL}/users/${userId}`, {
    userId: userId,
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return promise;
}

function getUserData({ userId }) {
  const config = {
    params: { userId: userId },
    headers: { Authorization: `Bearer ${authToken}` },
  };

  const promise = axios.get(`${BASE_URL}/finduser`, config);
  return promise;
}

function getSearchUsers(namePrototype) {
  const nameParameter = namePrototype + '%';
  const config = {
    params: { name: nameParameter },
    headers: { Authorization: `Bearer ${authToken}` },
  };
  const promise = axios.get(`${BASE_URL}/findname`, config);
  return promise;
}

function getLoggedUserId() {
  const config = {
    params: { token: authToken },
    headers: { Authorization: `Bearer ${authToken}` },
  };
  const promise = axios.get(`${BASE_URL}/fetchLoggedUserId`, config);
  return promise;
}

function deleteUserPost(postId) {
  const config = {
    body: { postId: postId },
    headers: { Authorization: `Bearer ${authToken}` },
  };
  const promise = axios.put(`${BASE_URL}/delete`, config.body, config);
  return promise;
}

function updateUserPost({ message, postId }) {
  const config = {
    body: { newMessage: message, postId: postId },
    headers: { Authorization: `Bearer ${authToken}` },
  };
  const promise = axios.put(`${BASE_URL}/update`, config.body, config);
  return promise;
}

function getTrendingTopics() {
  const promise = axios.get(`${BASE_URL}/hashtags`);
  return promise;
}

function getHashtagPosts(id) {
  const header = creatingHeaders();
  const promise = axios.get(`${BASE_URL}/hashtag/${id}`, header);
  return promise;
}

function postLike(id) {
  const header = creatingHeaders();
  const config = {
    body: { postId: id },
  };
  const promise = axios.post(`${BASE_URL}/like`, config.body, header);
  return promise;
}

function deleteLike(id) {
  const config = {
    body: { postId: id },
    headers: { Authorization: `Bearer ${authToken}` },
  };
  const promise = axios.put(`${BASE_URL}/like`, config.body, config);
  return promise;
}

function postSignup(body) {
  const promise = axios.post(`${BASE_URL}/signup`, body);
  return promise;
}

function postSignin(body) {
  const promise = axios.post(`${BASE_URL}/signin`, body);
  return promise;
}

function sharePost(postId, removeShare) {
  const config = {
    body: { postId: postId, removeShare: removeShare },
    headers: { Authorization: `Bearer ${authToken}` },
  };
  const promise = axios.post(`${BASE_URL}/share`, config.body, config);
  return promise;
}

export {
  postPost,
  getPost,
  getPicture,
  getUserPosts,
  getUserData,
  getSearchUsers,
  getLoggedUserId,
  deleteUserPost,
  updateUserPost,
  getTrendingTopics,
  getHashtagPosts,
  postLike,
  deleteLike,
  postSignup,
  postSignin,
  sharePost,
};
