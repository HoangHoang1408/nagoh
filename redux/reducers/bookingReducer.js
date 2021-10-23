import {
  ALL_BOOKINGS_FAIL,
  ALL_BOOKINGS_REQUEST,
  ALL_BOOKINGS_RESET,
  ALL_BOOKINGS_SUCCESS,
  BOOKED_DATES_FAIL,
  BOOKED_DATES_RESET,
  BOOKED_DATES_SUCCESS,
  BOOKING_DETAILS_FAIL,
  BOOKING_DETAILS_SUCCESS,
  CHECK_BOOKING_FAIL,
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_RESET,
  CHECK_BOOKING_SUCCESS,
} from "../constants/bookingConstants";

export const checkBookingReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHECK_BOOKING_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CHECK_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        isAvailable: action.payload.isAvailable,
        message: action.payload.message,
      };
    case CHECK_BOOKING_RESET:
      return {
        ...state,
        loading: null,
        error: null,
        isAvailable: null,
        message: null,
      };
    default:
      return { ...state };
  }
};
export const bookedDatesReducer = (
  state = {
    error: null,
    dates: [],
  },
  action
) => {
  switch (action.type) {
    case BOOKED_DATES_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case BOOKED_DATES_SUCCESS:
      return {
        ...state,
        dates: action.payload,
      };
    case BOOKED_DATES_RESET:
      return {
        ...state,
        error: null,
        dates: [],
      };
    default:
      return { ...state };
  }
};
export const allBookingsReducer = (state = [], action) => {
  switch (action.type) {
    case ALL_BOOKINGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_BOOKINGS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ALL_BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: action.payload,
      };
    case ALL_BOOKINGS_RESET:
      return {
        ...state,
        loading: null,
        error: null,
        bookings: null,
      };
    default:
      return { ...state };
  }
};
export const bookingDetailsReducer = (state = null, action) => {
  switch (action.type) {
    case BOOKING_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case BOOKING_DETAILS_SUCCESS:
      return {
        ...state,
        booking: action.payload,
      };
    default:
      return { ...state };
  }
};
