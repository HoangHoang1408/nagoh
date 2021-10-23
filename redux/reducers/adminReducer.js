import {
  ADIMIN_CREATE_ROOM_FAIL,
  ADIMIN_CREATE_ROOM_REQUEST,
  ADIMIN_CREATE_ROOM_RESET,
  ADIMIN_CREATE_ROOM_SUCCESS,
  ADIMIN_ROOMS_FAIL,
  ADIMIN_ROOMS_REQUEST,
  ADIMIN_ROOMS_SUCCESS,
  ADMIN_DELETE_BOOKING_FAIL,
  ADMIN_DELETE_BOOKING_REQUEST,
  ADMIN_DELETE_BOOKING_RESET,
  ADMIN_DELETE_BOOKING_SUCCESS,
  ADMIN_DELETE_REVIEW_FAIL,
  ADMIN_DELETE_REVIEW_REQUEST,
  ADMIN_DELETE_REVIEW_RESET,
  ADMIN_DELETE_REVIEW_SUCCESS,
  ADMIN_DELETE_ROOM_FAIL,
  ADMIN_DELETE_ROOM_REQUEST,
  ADMIN_DELETE_ROOM_RESET,
  ADMIN_DELETE_ROOM_SUCCESS,
  ADMIN_DELETE_USER_FAIL,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_RESET,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_GET_BOOKINGS_FAIL,
  ADMIN_GET_BOOKINGS_REQUEST,
  ADMIN_GET_BOOKINGS_SUCCESS,
  ADMIN_GET_BOOKING_FAIL,
  ADMIN_GET_BOOKING_REQUEST,
  ADMIN_GET_BOOKING_SUCCESS,
  ADMIN_GET_REVIEWS_FAIL,
  ADMIN_GET_REVIEWS_REQUEST,
  ADMIN_GET_REVIEWS_SUCCESS,
  ADMIN_GET_ROOM_FAIL,
  ADMIN_GET_ROOM_REQUEST,
  ADMIN_GET_ROOM_SUCCESS,
  ADMIN_GET_USERS_FAIL,
  ADMIN_GET_USERS_REQUEST,
  ADMIN_GET_USERS_SUCCESS,
  ADMIN_UPDATE_ROOM_FAIL,
  ADMIN_UPDATE_ROOM_REQUEST,
  ADMIN_UPDATE_ROOM_RESET,
  ADMIN_UPDATE_ROOM_SUCCESS,
} from "../constants/adminConstants";

export const adminRoomsReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ADIMIN_ROOMS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADIMIN_ROOMS_SUCCESS:
      return {
        ...state,
        loading: false,
        rooms: action.payload.rooms,
      };
    case ADIMIN_ROOMS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const adminCreateRoomReducer = (state = {}, action) => {
  switch (action.type) {
    case ADIMIN_CREATE_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADIMIN_CREATE_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ADIMIN_CREATE_ROOM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADIMIN_CREATE_ROOM_RESET:
      return {
        loading: null,
        error: null,
        success: null,
      };
    default:
      return state;
  }
};
export const adminUpdateRoomReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_UPDATE_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ADMIN_UPDATE_ROOM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADMIN_UPDATE_ROOM_RESET:
      return {
        loading: null,
        error: null,
        success: null,
      };
    default:
      return state;
  }
};

export const adminGetRoomReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_GET_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_GET_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        room: action.payload,
      };
    case ADMIN_GET_ROOM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const adminDeleteRoomReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_DELETE_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ADMIN_DELETE_ROOM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADMIN_DELETE_ROOM_RESET:
      return {
        ...state,
        loading: null,
        error: null,
        success: null,
      };
    default:
      return state;
  }
};
export const adminGetBookingsReducer = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case ADMIN_GET_BOOKINGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_GET_BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: action.payload,
      };
    case ADMIN_GET_BOOKINGS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const adminGetBookingReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_GET_BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_GET_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        booking: action.payload,
      };
    case ADMIN_GET_BOOKING_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const adminDeleteBookingReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_DELETE_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ADMIN_DELETE_BOOKING_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADMIN_DELETE_BOOKING_RESET:
      return {
        ...state,
        loading: null,
        error: null,
        success: null,
      };
    default:
      return state;
  }
};

export const adminGetReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ADMIN_GET_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_GET_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.payload,
      };
    case ADMIN_GET_REVIEWS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const adminDeleteReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ADMIN_DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADMIN_DELETE_REVIEW_RESET:
      return {
        ...state,
        loading: null,
        error: null,
        success: null,
      };
    default:
      return state;
  }
};

export const adminGetUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ADMIN_GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case ADMIN_GET_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const adminDeleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ADMIN_DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADMIN_DELETE_USER_RESET:
      return {
        ...state,
        loading: null,
        error: null,
        success: null,
      };
    default:
      return state;
  }
};
