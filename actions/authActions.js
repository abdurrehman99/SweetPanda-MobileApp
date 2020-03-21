import {GET_ERRORS, SET_CURRENT_USER} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';
// import {decode} from 'jsonwebtoken';
import {baseURL} from '../app.json';

//Register User
export const registerUser = userData => dispatch => {
  axios
    .post(baseURL + '/api/users/register', userData)
    .then(res => {
      console.log('user registered');
      // history.push('/login');
      // sweetAlert({
      //   title: "You are successfully registered to Sweet Panda !",
      //   icon: "success"
      // });
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

//FB login Route
// export const fbLogin = res => dispatch =>{

//     //get token form response
//     const { accessToken } = res;

//     //Save to local storage
//     localStorage.setItem("jwtToken", "Bearer "+accessToken);

//     //decode token to get data
//     const decoded = jwtDecode(accessToken);
//     //set current user
//     dispatch(setCurrentUser(decoded));
//     sweetAlert({
//       title: "You are now logged in to Sweet Panda !",
//       icon: "success"
//     });
// }

//Login & get Token
export const loginUser = userData => dispatch => {
  axios
    .post(baseURL + '/api/users/login', userData)
    .then(res => {
      //get token form response
      const {token} = res.data;

      //set token to AUTH header
      setAuthToken(token);
      //decode token to get data
      const decoded = jwtDecode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });

      console.log('Logged in');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Set Current user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//Log user out
export const logoutUser = () => dispatch => {
  //Remove token from local storage

  //remove auth header
  setAuthToken(false);

  //Clear cart

  //Set current user to { } & isAuthenticated : false
  dispatch(setCurrentUser({}));
};
