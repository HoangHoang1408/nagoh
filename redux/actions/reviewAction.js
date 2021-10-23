import axios from "axios";
import { getSession } from "next-auth/client";
import {
  CREATE_REVIEW_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  ROOM_REVIEWS_REQUEST,
  ROOM_REVIEWS_SUCCESS,
  ROOM_REVIEWS_FAIL,
  UPDATE_REVIEW_REQUEST,
  UPDATE_REVIEW_SUCCESS,
  UPDATE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
} from "../constants/reviewConstants";
export const createReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_REVIEW_REQUEST,
    });
    const { data } = await axios.post("/api/review", reviewData);
    dispatch({
      type: CREATE_REVIEW_SUCCESS,
      payload: data.review,
    });
  } catch (err) {
    dispatch({
      type: CREATE_REVIEW_FAIL,
      payload: err.response.data.message,
    });
  }
};
export const updateReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_REVIEW_REQUEST,
    });
    const { data } = await axios.put("/api/review", reviewData);
    dispatch({
      type: UPDATE_REVIEW_SUCCESS,
      payload: data.review,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_REVIEW_FAIL,
      payload: err.response.data.message,
    });
  }
};
export const deleteReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_REVIEW_REQUEST,
    });
    await axios.delete("/api/review", { data: reviewData });
    dispatch({
      type: DELETE_REVIEW_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: err.response.data.message,
    });
  }
};
export const getRoomReviews = (roomId, skip) => async (dispatch) => {
  try {
    const session = await getSession();
    dispatch({
      type: ROOM_REVIEWS_REQUEST,
    });
    const { data } = await axios.post(`/api/review/room/${roomId}`, {
      skip,
      userId: session?.user?._id,
    });
    dispatch({
      type: ROOM_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (err) {
    dispatch({
      type: ROOM_REVIEWS_FAIL,
      payload: err.response.data.message,
    });
  }
};
