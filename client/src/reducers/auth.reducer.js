/*import {
  AUTH_FORM_SUCCESS,
  AUTH_FORM_FAIL,
  AUTH_ERROR,
  USER_IS_LOADED,
  LOG_OUT,
  CHANGE_PASSWORD_FAIL,
  CHECK_PASSWORDS,
  CHANGE_PROFILE,
  CHANGE_USER_DATA_FAILED,
  GET_USERS,
  SEARCH_BY_USERNAME,
} from "../constants/auth.constants";

const initialState = {
  token: localStorage.getItem("token"),
  users: [],
  user: {},
  errors: {},
  isLoggedIn: false,
  isAllowedToChangePassword: false,
  isPasswordChanged: false,
  isLoading: false,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_FORM_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isLoggedIn: true,
        isAllowedToChangePassword: false,
        isPasswordChanged: false,
        isLoading: false,
        errors: {},
      };
    case CHANGE_PROFILE:
      return {
        ...state,
        ...payload,
        isLoggedIn: true,
        isAllowedToChangePassword: false,
        isPasswordChanged: false,
        isLoading: false,
        errors: null,
      };
    case CHECK_PASSWORDS:
      return {
        ...state,
        ...payload,
        isAllowedToChangePassword: true,
        errors: {},
      };

    case GET_USERS:
    case SEARCH_BY_USERNAME:
      return {
        ...state,
        users: [...payload],
        isLoggedIn: true,
        isAllowedToChangePassword: false,
        isPasswordChanged: false,
        isLoading: false,
        errors: null,
      };
    case AUTH_FORM_FAIL:
    case AUTH_ERROR:
    case LOG_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        ...payload,
        errors: payload,
        user: {},
        isLoggedIn: false,
        isAllowedToChangePassword: false,
        isPasswordChanged: false,
        isLoading: false,
      };
    case CHANGE_PASSWORD_FAIL:
    case CHANGE_USER_DATA_FAILED:
      return {
        ...state,
        errors: payload,
      };
    case USER_IS_LOADED:
      localStorage.getItem("token");
      return {
        ...state,
        ...payload,
        user: payload,
        errors: {},
        isLoggedIn: true,
        isAllowedToChangePassword: false,
        isPasswordChanged: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default auth;
*/
import { SET_CURRENT_USER, USER_LOADING } from "../actions/auths/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
