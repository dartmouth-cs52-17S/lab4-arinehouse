import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  post: {},
};

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return Object.assign({}, state, { all: action.payload.data });
    case ActionTypes.FETCH_POST:
      return Object.assign({}, state, { post: action.payload.data });
    default:
      return state;
  }
};

export default PostsReducer;
