import setAuthenticationToken from "middleware/setAuthenticationToken";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";
export const logoutUser = () => dispatch => {

  // Remove token from local storage
  localStorage.removeItem("token");
  // Remove auth header for future requests
  setAuthenticationToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  window.location.href = "/auth";
}
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};