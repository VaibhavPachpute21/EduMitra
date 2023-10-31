import axios from 'axios';
import { toast } from 'react-toastify';
import {getUserId} from './userActions'

// Action to add a new project
export const addNewProject = (project, userToken) => async (dispatch) => {
  console.log(project)
  console.log(userToken)
  dispatch({ type: "ADD_PROJECT_REQUEST" });
  try {
    const res = await axios.post('http://127.0.0.1:8080/api/project/add', project, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    dispatch({ type: "ADD_PROJECT_SUCCESS" });
    toast.success("Project Added!!");
  } catch (error) {
    dispatch({ type: "ADD_PROJECT_ERROR", payload: error });
    toast.error(error.response ? error.response.data.message : "Failed to add the project");
  }
};


// Action to get all projects
export const getAllProjects = () => async (dispatch) => {
  dispatch({ type: "GET_ALL_PROJECTS_REQUEST" });
  try {
    const res = await axios.get('http://127.0.0.1:8080/api/project/allProject');
    console.log(res.data.projects)
    dispatch({ type: "GET_ALL_PROJECTS_SUCCESS", payload: res.data.projects });
  } catch (error) {
    dispatch({ type: "GET_ALL_PROJECTS_ERROR", payload: error });
    toast.error(error.response ? error.response.data.message : "Failed to fetch projects");
  }
};

// Action to get user-specific projects
export const getUserProjects = (userToken) => async (dispatch) => {
  dispatch({ type: "GET_USER_PROJECTS_REQUEST" });
  try {
    const res = await axios.get('http://127.0.0.1:8080/api/project/userProject', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    dispatch({ type: "GET_USER_PROJECTS_SUCCESS", payload: res.data.userProjects });
  } catch (error) {
    dispatch({ type: "GET_USER_PROJECTS_ERROR", payload: error });
    toast.error(error.response ? error.response.data.message : "Failed to fetch user-specific projects");
  }
};

// Action to get Single Project
export const getSingleProject = (projectId) => async (dispatch) => {
  dispatch({ type: "GET_SINGLE_PROJECT_REQUEST" });
  try {
    const res = await axios.get(`http://127.0.0.1:8080/api/project/${projectId}`);
    dispatch({ type: "GET_SINGLE_PROJECT_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "GET_SINGLE_PROJECT_ERROR", payload: error });
    toast.error(error.response ? error.response.data.message : "Failed to fetch the single project");
  }
};


export const addComment = (projectId, commentText, userToken) => async (dispatch) => {
  try {
    const res = await axios.post(`http://127.0.0.1:8080/api/project/addComment/${projectId}`, { text: commentText }, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    dispatch({ type: "ADD_COMMENT_SUCCESS", payload: res.data });
    dispatch(getSingleProject(projectId));
  } catch (error) {
    dispatch({ type: "ADD_COMMENT_ERROR", payload: error });
    toast.error(error.response ? error.response.data.message : "Failed to add comment");
  }
};

// Action to get projects by college name
export const getProjectsByCollegeName = (collegeName) => async (dispatch) => {
  dispatch({ type: "GET_PROJECTS_BY_COLLEGE_REQUEST" });

  try {
    const response = await axios.get(`http://127.0.0.1:8080/api/project/collageProject/${collegeName}`);

    dispatch({
      type: "GET_PROJECTS_BY_COLLEGE_SUCCESS",
      payload: response.data.projects,
    });
  } catch (error) {
    dispatch({
      type: "GET_PROJECTS_BY_COLLEGE_ERROR",
      payload: error.message,
    });
  }
};

// Action to add grades to a project
export const addGradesToProject = (projectId, grades, userToken,mailData) => async (dispatch) => {
  dispatch({ type: "ADD_GRADES_REQUEST" });

  try {
    const res = await axios.post(`http://127.0.0.1:8080/api/project/addGrades/${projectId}`, grades, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    dispatch({ type: "ADD_GRADES_SUCCESS", payload: res.data });
    toast.success("Grades added successfully!");
  } catch (error) {
    dispatch({ type: "ADD_GRADES_ERROR", payload: error });
    toast.error(error.response ? error.response.data.message : "Failed to add grades");
  }
};

// Function to fetch projects by user ID
export const getProjectsByUserId = (userId) => async (dispatch) => {
  dispatch({ type: "GET_USER_PROJECTS_REQUEST" });
  try {
    const res = await axios.get(`http://127.0.0.1:8080/api/users/userProject/${userId}`);
    dispatch({ type: "GET_USER_PROJECTS_SUCCESS", payload: res.data.projects });
  } catch (error) {
    dispatch({ type: "GET_USER_PROJECTS_ERROR", payload: error });
    console.error('Failed to fetch user projects:', error);
  }
};
