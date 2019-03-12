import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types'
import SetAuthToken from '../helper/authtoken';
import jwt_decode from 'jwt-decode';

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const registerUser = (user, history) => dispatch => {
    axios.post('/api/users/register', user)
    .then(res => history.push('/login'))
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    });
}

export const loginUser = (user) => dispatch =>{
    axios.post('/api/users/login', user)
    .then(res => {
        //console.log(res.data);
        const token = `${res.data.token_type} ${res.data.access_token}`;
        localStorage.setItem('jwtToken', token);
        SetAuthToken(token);
        //console.log(token);
        const decoded = jwt_decode(token)
        //console.log(decoded)
        dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    });
}

export const logoutUser = (history) => dispatch =>{
    localStorage.removeItem("jwtToken");
    SetAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push("/login");
}

