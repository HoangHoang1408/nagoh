import {
  SEARCH_ROOMS_FAIL,
  SEARCH_ROOMS_REQUEST,
  SEARCH_ROOMS_RESET,
  SEARCH_ROOMS_SUCCESS,
} from "../constants/searchConstants";

export const searchRoomsReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case SEARCH_ROOMS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_ROOMS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SEARCH_ROOMS_SUCCESS:
      return {
        ...state,
        loading: false,
        rooms: action.payload,
      };
    case SEARCH_ROOMS_RESET:
      return {
        ...state,
        loading: null,
        rooms: null,
        error: null,
      };
    default:
      return { ...state };
  }
};
