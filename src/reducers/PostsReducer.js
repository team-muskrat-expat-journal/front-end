import {
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  POST_ADD,
  POST_ADD_ERROR,
  POST_DELETE,
  POST_DELETE_ERROR,
  POST_EDIT,
  POST_EDIT_ERROR,
} from "../actions/PostsAction";

const initialState = {
  posts: [],
  loading: false,
  error: "",
};

export const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case POST_ADD:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case POST_ADD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case POST_DELETE:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case POST_DELETE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case POST_EDIT:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case POST_EDIT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
