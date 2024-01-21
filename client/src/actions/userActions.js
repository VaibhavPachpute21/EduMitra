import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import {userLoginReducer} from '../reducers/userReducers'

// Action to Regiter New User
export const registerUser = (user) => async dispatch => {
    dispatch({ type: "REGISTER_USER_REQUEST" })
    try {
        const res = await axios.post(`http://127.0.0.1:8080/api/users/register`, user)
        dispatch({ type: "REGISTER_USER_SUCCESS" })
        toast.success("User Registered!!")
        setTimeout(() => {
            window.location.href = "/Login"
        }, 2500)
    } catch (error) {
        dispatch({ type: "REGISTER_USER_ERROR", payload: error })
        toast.error(error.response ? error.response.data.message : "Login failed")
    }

}

// Action for User Login
export const loginUser = (user) => async (dispatch) => {
    dispatch({ type: "USER_LOGIN_REQUEST" });
    try {
        const res = await axios.post(`http://127.0.0.1:8080/api/users/login`, user);
        dispatch({ type: "USER_LOGIN_SUCCESS", payload: res.data });
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        toast.success("Logged In!!");
        window.location.href = "/Dashboard"
    } catch (error) {
        dispatch({ type: "USER_LOGIN_FAIL", payload: error });
        toast.error(error.response ? error.response.data.message : "Login failed");
    }
};


export const logoutUser = (dispatch) => {
    localStorage.removeItem("currentUser");
    window.location.href = '/login'
}
// Action to Get All Users
export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: 'GET_ALL_USERS_REQ' })
    try {
        const res = await axios.get('http://127.0.0.1:8080/api/users/allUsers');
        console.log(res.data)
        dispatch({ type: 'GET_ALL_USERS_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'GET_ALL_USER_FAIL', payload: error })
    }
}

export const getUsersByCollage = (collegeName) => async (dispatch) => {
    dispatch({ type: "GET_ALL_COLLEAGUES_REQ" })
    try {
        const res = await axios.get(`http://127.0.0.1:8080/api/users/collageUsers/${collegeName}`);
        console.log(res.data)
        dispatch({ type: 'GET_ALL_COLLEAGUES_SUCCESS', payload: res.data.users });
    } catch (error) {
        dispatch({ type: 'GET_ALL_COLLEAGUES_FAIL', payload: error })
        toast.error(error.response ? error.response.data.message : "Failed Load...");
    }
}

// Action to Get User By ID
export const getUserId = (userID) => async (dispatch) => {
    dispatch({ type: "GET_USER_REQ" })
    try {
        const res = await axios.get(`http://127.0.0.1:8080/api/users/profile/${userID}`);
        console.log(res.data)
        dispatch({ type: 'GET_USER_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'GET_USER_FAIL', payload: error })
        toast.error(error.response ? error.response.data.message : "Failed to Load...");
    }
}

//Action to update User
export const updateUser = (userData,userToken) => async (dispatch) => {
    dispatch({ type: "UPDATE_USER_REQ" })
    try {
        const res=await axios.post(`http://127.0.0.1:8080/api/users/update`,userData,{
            headers: {
                Authorization: `Bearer ${userToken}`,
              }
        });
        dispatch({ type: "UPDATE_USER_SUCCESS",payload: res.data.updatedUser })
        const currentUser= JSON.parse(localStorage.getItem('currentUser'));
        currentUser.user=res.data.updatedUser;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        dispatch({ type: "USER_LOGIN_SUCCESS", payload: currentUser });
        toast.success("Profile updated successfully!");

    } catch (error) {
        dispatch({ type: "UPDATE_USER_FAIL" , payload: error })
        toast.error(error.response ? error.response.data.message : "Failed updated profile!");
    }

}
