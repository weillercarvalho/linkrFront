import axios from 'axios';

const BASE_URL = `https://linkr-project-backend.herokuapp.com`;
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

function getPost() {
  const promise = axios.get(`${BASE_URL}/timeline`);
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
};
