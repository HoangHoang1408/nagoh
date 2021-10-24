import {
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_RESET,
  CLEAR_ERRORS,
  RESET_STATE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_RESET,
  REGISTER_USER_RESET,
} from "../constants/userConstants";

const initState = {
  loading: null,
  error: null,
  user: null,
};
export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case RESET_STATE:
      return {
        ...initState,
      };
    default:
      return state;
  }
};
export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        registerSuccess: true,
      };
    case REGISTER_USER_RESET:
      return {};
    default:
      return state;
  }
};
export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: true,
      };
    case UPDATE_PROFILE_RESET:
      return {
        loading: null,
        error: null,
        isUpdated: null,
      };
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        updatePasswordLoading: true,
      };
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        updatePasswordLoading: false,
        updatePasswordError: action.payload,
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        updatePasswordLoading: false,
        isUpdatedPassword: true,
      };
    case UPDATE_PASSWORD_RESET:
      return {
        ...state,
        updatePasswordLoading: null,
        updatePasswordError: null,
        isUpdatedPassword: null,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        forgotPasswordLoading: true,
      };
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPasswordError: action.payload,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPasswordMessage: action.payload,
      };
    case FORGOT_PASSWORD_RESET:
      return {
        ...state,
        forgotPasswordLoading: null,
        forgotPasswordError: null,
        forgotPasswordMessage: null,
      };
    default:
      return { ...state };
  }
};
export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resetPasswordLoading: true,
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        resetPasswordLoading: false,
        resetPasswordError: action.payload,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordLoading: false,
        resetPasswordSuccess: true,
      };
    case RESET_PASSWORD_RESET:
      return {
        ...state,
        resetPasswordLoading: null,
        resetPasswordError: null,
        resetPasswordSuccess: null,
      };
    default:
      return { ...state };
  }
};
