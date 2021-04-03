import axios from "axios";
import { USER_IS_LOADED, AUTH_ERROR , PROFILE_LOADING } from "../../constants/auth.constants";
import setAuthenticationToken from "../../middleware/setAuthenticationToken";



export const userLoaded = () =>  dispatch => {
  console.log(localStorage.token);
  if (localStorage.token) {
      setAuthenticationToken(localStorage.token);
  }
  try {
      const res =  axios.get('http://localhost:8000/users/');
      dispatch({
          type: USER_IS_LOADED,
          payload: res.data
          
      });
  } catch (error) {
      dispatch({
          type: AUTH_ERROR
      });
  }
}
