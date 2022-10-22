import axios from 'axios';

const BASE_URL = `http://localhost:5000`;

function creatingHeaders() {
  const auth = localStorage.getItem('token');
  const header = {
    headers: {
      Authorization: `Bearer ${auth}`,
    }
  }
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
  console.log(userId);
  const promise = axios.get(`${BASE_URL}/users/${userId}`, { userId: userId });
  return promise;
}

function getUserData({ userId }) {
  const config = {
    params: { userId: userId },
  };

  const promise = axios.get(`${BASE_URL}/finduser`, config);
  return promise;
}

function getSearchUsers(namePrototype) {
  const nameParameter = namePrototype + '%';
  const config = {
    params: { name: nameParameter },
  };
  const promise = axios.get(`${BASE_URL}/findname`, config);
  return promise;
}

export {
  postPost,
  getPost,
  getPicture,
  getUserPosts,
  getUserData,
  getSearchUsers,
};
