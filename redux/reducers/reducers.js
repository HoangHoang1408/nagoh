import {
  adminCreateRoomReducer,
  adminDeleteBookingReducer,
  adminDeleteReviewReducer,
  adminDeleteRoomReducer,
  adminDeleteUserReducer,
  adminGetBookingReducer,
  adminGetBookingsReducer,
  adminGetReviewsReducer,
  adminGetRoomReducer,
  adminGetUsersReducer,
  adminRoomsReducer,
  adminUpdateRoomReducer,
} from "./adminReducer";
import { allRoomsReducer } from "./allRoomsReducer";
import {
  allBookingsReducer,
  bookedDatesReducer,
  bookingDetailsReducer,
  checkBookingReducer,
} from "./bookingReducer";
import {
  createReviewReducer,
  deleteReviewReducer,
  roomReviewsReducer,
  updateReviewReducer,
} from "./reviewReducer";
import roomDetailsReducer from "./roomDetails";
import { searchRoomsReducer } from "./searchReducer";
import {
  authReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
  userReducer,
} from "./userReducer";

const { combineReducers } = require("redux");

const reducers = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  allBookings: allBookingsReducer,
  bookingDetails: bookingDetailsReducer,
  createReview: createReviewReducer,
  updateReview: updateReviewReducer,
  deleteReview: deleteReviewReducer,
  roomReviews: roomReviewsReducer,
  adminRooms: adminRoomsReducer,
  adminCreateRoom: adminCreateRoomReducer,
  adminGetRoom: adminGetRoomReducer,
  adminUpdateRoom: adminUpdateRoomReducer,
  adminDeleteRoom: adminDeleteRoomReducer,
  adminGetBookings: adminGetBookingsReducer,
  adminDeleteBooking: adminDeleteBookingReducer,
  adminGetBooking: adminGetBookingReducer,
  adminGetReviews: adminGetReviewsReducer,
  adminDeleteReview: adminDeleteReviewReducer,
  adminGetUsers: adminGetUsersReducer,
  adminDeleteUser: adminDeleteUserReducer,
  searchRooms: searchRoomsReducer,
});
export default reducers;
