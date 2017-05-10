import axios from 'axios';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
};

const ROOT_URL = 'http://localhost:9090/api';
// const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
// const API_KEY = '?key=a_rinehouse';

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: response });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function createPost(post, history) {
  return (dispatch) => {
    const fields = { title: post.title, content: post.content, tags: post.tags, cover_url: post.cover_url };
    axios.post(`${ROOT_URL}/posts`, fields).then(() => {
      history.push('/');
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function updatePost(id, fields) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}`, fields).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: response });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: response });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`).then(() => {
      history.push('/');
    }).catch((error) => {
      console.log(error);
    });
  };
}
