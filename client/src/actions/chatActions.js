import axios from 'axios';
import { toast } from 'react-toastify';

export const sendMessage = (messageData) => async (dispatch) => {
    dispatch({ type: "SEND_MSG_REQUEST" });
    try {
        console.log("sending")
        const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/chats/send`, messageData);
        dispatch({ type: "SEND_MSG_SUCCESS" });
        // toast.success("Message Sent!");
    } catch (error) {
        dispatch({ type: "SEND_MSG_ERROR", payload: error });
        toast.error(error.response ? error.response.data.message : "Failed to send message");
    }
}

export const getMessages = (sender, receiver) => async (dispatch) => {
    dispatch({ type: "GET_MSG_REQUEST" });
    try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/chats/conversation/${sender}/${receiver}`);
        dispatch({ type: "GET_MSG_SUCCESS", payload: res.data });
    } catch (error) {
        dispatch({ type: "GET_MSG_ERROR", payload: error });
        toast.error(error.response ? error.response.data.message : "Failed to load message");

    }
}