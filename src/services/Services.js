import axios from "axios";

const BASE_URL = `http://localhost:4000`;

function postPost(body) {
  const promise = axios.post(`${BASE_URL}/post`, body);
  return promise;
}

function getPost() {
  const promise = axios.get(`${BASE_URL}/getpost`);
  return promise;
}

export { postPost, getPost };
