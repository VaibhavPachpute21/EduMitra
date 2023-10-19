import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';


export const registerUser = (user) => async dispatch => {
    dispatch({ type: "REGISTER_USER_REQUEST" })
    try {
        const res = await axios.post(`http://127.0.0.1:8080/api/users/register`, user)
        dispatch({ type: "REGISTER_USER_SUCCESS" })
        toast.success("User Registered!!")
        setTimeout(()=>{
            window.location.href = "/Login"
          },2500)
    } catch (error) {
        dispatch({ type: "REGISTER_USER_ERROR", payload: error })
        toast.error(error.response ? error.response.data.message : "Login failed")
    }

}

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

export const getAllUsers = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/users/allUsers');
        console.log(res.data)
        dispatch({ type: 'GET_ALL_USERS_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'GET_ALL_USER_FAIL', payload: error })
    }
}