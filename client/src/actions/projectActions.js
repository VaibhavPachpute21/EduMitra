import axios from 'axios';
import { toast } from 'react-toastify';

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

// Action to get SingleProject
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
    const res = await axios.post(`http://127.0.0.1:8080/api/projects/addComment/${projectId}`, { text: commentText }, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    dispatch({ type: "ADD_COMMENT_SUCCESS", payload: res.data });
    // Optionally, you can refresh the project data after adding the comment
    // dispatch(getProjectDetails(projectId));
  } catch (error) {
    dispatch({ type: "ADD_COMMENT_ERROR", payload: error });
    toast.error(error.response ? error.response.data.message : "Failed to add comment");
  }
};
