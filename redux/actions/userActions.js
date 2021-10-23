import axios from "axios";
import {
  CLEAR_ERRORS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  RESET_STATE,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_RESET,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_RESET,
  RESET_PASSWORD_FAIL,
} from "../constants/userConstants";

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    await axios.post("/api/auth/register", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({
      type: REGISTER_USER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });
    const { data } = await axios.get("/api/me");
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (err) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: err.response.data.message,
    });
  }
};
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
    });
    await axios.put("/api/me/updateInfo", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(loadUser());
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: err.response.data.message,
    });
  } finally {
    dispatch({ type: UPDATE_PROFILE_RESET });
  }
};
export const updatePassword = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PASSWORD_REQUEST,
    });
    await axios.put("/api/me/updatePassword", data);
    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: err.response.data.message,
    });
  } finally {
    dispatch({ type: UPDATE_PASSWORD_RESET });
  }
};
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    const { data } = await axios.post("/api/password/forgot", { email });
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (err) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: err.response.data.message,
    });
  } finally {
    dispatch({ type: FORGOT_PASSWORD_RESET });
  }
};
export const resetPassword =
  ({ newPassword, token }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: RESET_PASSWORD_REQUEST,
      });
      await axios.post("/api/password/reset", { newPassword, token });
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: err.response.data.message,
      });
    } finally {
      dispatch({ type: RESET_PASSWORD_RESET });
    }
  };
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
export const resetState = () => async (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};
