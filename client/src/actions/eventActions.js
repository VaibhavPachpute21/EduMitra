import axios from 'axios';
import { toast } from 'react-toastify';

// Action to add a new event
export const addNewEvent = (event, userToken) => async (dispatch) => {
  dispatch({ type: "ADD_EVENT_REQUEST" });
  try {
    const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/events/add`, event, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    dispatch({ type: "ADD_EVENT_SUCCESS" });
    toast.success("Event Added!!");
  } catch (error) {
    dispatch({ type: "ADD_EVENT_ERROR", payload: error });
    toast.error(error.response ? error.response.data.message : "Failed to add the event");
  }
};

// Action to get all events
export const getAllEvents = () => async (dispatch) => {
  dispatch({ type: "GET_ALL_EVENTS_REQUEST" });
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/events/allEvents`);
    dispatch({ type: "GET_ALL_EVENTS_SUCCESS", payload: res.data.events });
  } catch (error) {
    dispatch({ type: "GET_ALL_EVENTS_ERROR", payload: error });
    toast.error(error.response ? error.response.data.message : "Failed to fetch events");
  }
};
