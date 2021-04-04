import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL } from './types';
import setAuthToken from '../utils/setAuthToken';


//Laod User
export const loadUser = () => async dispatch => {
    console.log(localStorage.token);
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('http://localhost:5000/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

//Register User
export const register = ({name, email, password ,userName,lastName}) =>
    async dispatch => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ name, email, password ,userName,lastName });
        try {
            const res = await axios.post('http://localhost:5000/api/user', body, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            dispatch(loadUser());
        } catch (err) {
            const errors = await err.response.data.errors;
            console.log(errors);
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }

            dispatch({
                type: REGISTER_FAIL
            })
        }
        window.location.href = "/login-page";
    }

//Login User
export const login = (email, password) =>
    async dispatch => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ email, password });
        console.log(email);
        console.log(password);
        try {
            const res = await axios.post('http://localhost:5000/api/auth', body, config);
            console.log(body);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            dispatch(loadUser());
        } catch (err) {
            const errors = await err.response.data.errors;
            console.log(errors);
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }


            dispatch({
                type: LOGIN_FAIL
            })
        }

    }
    export const logoutUser = () => dispatch => {
        // Remove token from local storage
        localStorage.removeItem("token");
        // Remove auth header for future requests
        setAuthToken(false);
        // Set current user to empty object {} which will set isAuthenticated to false
        dispatch(setCurrentUser({}));
        window.location.href = "/login-page";
      };
      export const setCurrentUser = decoded => {
        return {
        type: USER_LOADED,
          payload: decoded
        };
      };