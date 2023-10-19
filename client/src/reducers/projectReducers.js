const projectInitialState = {
    loading: false,
    projects: [],
    userProjects: [],
    error: null,
  };
  
  export const projectReducer = (state = projectInitialState, action) => {
    switch (action.type) {
      case "ADD_PROJECT_REQUEST":
        return {
          ...state,
          loading: true,
        };
      case "ADD_PROJECT_SUCCESS":
        return {
          ...state,
          loading: false,
        };
      case "ADD_PROJECT_ERROR":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case "GET_ALL_PROJECTS_REQUEST":
        return {
          ...state,
          loading: true,
        };
      case "GET_ALL_PROJECTS_SUCCESS":
        return {
          ...state,
          loading: false,
          projects: action.payload,
        };
      case "GET_ALL_PROJECTS_ERROR":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case "GET_USER_PROJECTS_REQUEST":
        return {
          ...state,
          loading: true,
        };
      case "GET_USER_PROJECTS_SUCCESS":
        return {
          ...state,
          loading: false,
          userProjects: action.payload,
        };
      case "GET_USER_PROJECTS_ERROR":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  