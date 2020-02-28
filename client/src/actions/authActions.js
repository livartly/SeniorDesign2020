import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';

export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const SET_CURRENT_USER = "SET_CURRENT_USER";



export const setCurrentUser = decodedUser => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedUser
  };
};

export const clearErrors = () => {
  return {
    type: RECEIVE_ERRORS,
    payload: {}
  };
};

// registers a user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/registration', userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch({
      type: RECEIVE_ERRORS,
      payload: err.response.data.error
    }));
};

export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      const {
        token
      } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decodedUser = jwtDecode(token);
      dispatch(setCurrentUser(decodedUser));
    })
    .catch(err =>
      dispatch({
        type: RECEIVE_ERRORS,
        payload: err.response.data.error
      })
    );
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};