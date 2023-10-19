import axios from 'axios';
import { toast } from 'react-toastify';

// Action to add a new project
export const addNewProject = (project) => async (dispatch) => {
  dispatch({ type: "ADD_PROJECT_REQUEST" });
  try {
    const res = await axios.post('http://127.0.0.1:8080/api/projects/add', project);
    dispatch({ type: "ADD_PROJECT_SUCCESS" });
    toast.success("Project Added!!");
  } catch (error) {
    dispatch({ type: "ADD_PROJECT_ERROR", payload: error });
    toast.error(error.response ? error.response.data.message : "Failed to add project");
  }
};

// Action to get all projects
export const getAllProjects = () => async (dispatch) => {
  dispatch({ type: "GET_ALL_PROJECTS_REQUEST" });
  try {
    const res = await axios.get('http://127.0.0.1:8080/api/projects/allProject');
    dispatch({ type: "GET_ALL_PROJECTS_SUCCESS", payload: res.data.projects });
  } catch (error) {
    dispatch({ type: "GET_ALL_PROJECTS_ERROR", payload: error });
    toast.error(error.response ? error.response.data.message : "Failed to fetch projects");
  }
};

// Action to get user-specific projects
export const getUserProjects = () => async (dispatch) => {
  dispatch({ type: "GET_USER_PROJECTS_REQUEST" });
  try {
    const res = await axios.get('http://127.0.0.1:8080/api/projects/userProject');
    dispatch({ type: "GET_USER_PROJECTS_SUCCESS", payload: res.data.userProjects });
  } catch (error) {
    dispatch({ type: "GET_USER_PROJECTS_ERROR", payload: error });
    toast.error(error.response ? error.response.data.message : "Failed to fetch user-specific projects");
  }
};
