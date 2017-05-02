import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  post: {},
};

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return {
        all: action.payload.data,
      };
    case ActionTypes.FETCH_POST:
      return {
        post: action.payload.data,
      };
    default:
      return initialState;
  }
};

export default PostsReducer;
