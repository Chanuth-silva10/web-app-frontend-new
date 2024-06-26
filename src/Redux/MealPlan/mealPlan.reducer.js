import {
  CREATE_MEAL_PLAN_COMMENT_SUCCESS,
  CREATE_MEAL_PLAN_POST_FAILURE,
  CREATE_MEAL_PLAN_POST_REQUEST,
  CREATE_MEAL_PLAN_POST_SUCCESS,
  DELETE_MEAL_POST_FAILURE,
  DELETE_MEAL_POST_REQUEST,
  DELETE_MEAL_POST_SUCCESS,
  GET_ALL_MEAL_PLAN_POST_FAILURE,
  GET_ALL_MEAL_PLAN_POST_REQUEST,
  GET_ALL_MEAL_PLAN_POST_SUCCESS,
  LIKE_MEAL_PLAN_POST_FAILURE,
  LIKE_MEAL_PLAN_POST_REQUEST,
  LIKE_MEAL_PLAN_POST_SUCCESS,
  UPDATE_MEAL_POST_FAILURE,
  UPDATE_MEAL_POST_REQUEST,
  UPDATE_MEAL_POST_SUCCESS,
} from "./mealPlan.actionType";

const initialState = {
  post: null,
  error: null,
  loading: false,
  posts: [],
  like: null,
  comments: [],
  newComment: null,
};

export const MealPlanReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MEAL_PLAN_POST_REQUEST:
    case GET_ALL_MEAL_PLAN_POST_REQUEST:
    case LIKE_MEAL_PLAN_POST_REQUEST:
    case DELETE_MEAL_POST_REQUEST:
    case UPDATE_MEAL_POST_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_MEAL_PLAN_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        posts: [action.payload, ...state.posts],
        loading: false,
        error: null,
      };
    case UPDATE_MEAL_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        posts: state.posts.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
        error: null,
      };
    case DELETE_MEAL_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload,
      };
    case GET_ALL_MEAL_PLAN_POST_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        comments: action.payload.comments,
        loading: false,
        error: null,
      };
    case LIKE_MEAL_PLAN_POST_SUCCESS:
      return {
        ...state,
        like: action.payload,
        posts: state.posts.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
        error: null,
      };

    case CREATE_MEAL_PLAN_COMMENT_SUCCESS:
      return {
        ...state,
        newComment: action.payload,
        loading: false,
        error: null,
      };
    case CREATE_MEAL_PLAN_POST_FAILURE:
    case GET_ALL_MEAL_PLAN_POST_FAILURE:
    case LIKE_MEAL_PLAN_POST_FAILURE:
    case DELETE_MEAL_POST_FAILURE:
    case UPDATE_MEAL_POST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
