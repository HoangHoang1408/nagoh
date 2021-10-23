import {
  CREATE_REVIEW_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_RESET,
  CREATE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_SUCCESS,
  ROOM_REVIEWS_FAIL,
  ROOM_REVIEWS_REQUEST,
  ROOM_REVIEWS_RESET,
  ROOM_REVIEWS_SUCCESS,
  UPDATE_REVIEW_FAIL,
  UPDATE_REVIEW_REQUEST,
  UPDATE_REVIEW_RESET,
  UPDATE_REVIEW_SUCCESS,
} from "../constants/reviewConstants";

export const createReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        review: action.payload,
      };
    case CREATE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_REVIEW_RESET: {
      return {
        error: null,
        loading: null,
        review: null,
      };
    }
    default:
      return state;
  }
};
export const updateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        review: action.payload,
      };
    case UPDATE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_REVIEW_RESET: {
      return {
        error: null,
        loading: null,
        review: null,
      };
    }
    default:
      return state;
  }
};

export const deleteReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REVIEW_RESET: {
      return {
        error: null,
        loading: null,
        review: null,
      };
    }
    default:
      return state;
  }
};
export const roomReviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case ROOM_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ROOM_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.payload,
      };
    case ROOM_REVIEWS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ROOM_REVIEWS_RESET: {
      return {
        error: null,
        loading: null,
      };
    }
    default:
      return state;
  }
};
