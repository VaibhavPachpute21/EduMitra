const projectInitialState = {
  loading: false,
  projects: [],
  userProjects: [],
  collageProjects: [],
  singleProject: null,
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
    case "GET_SINGLE_PROJECT_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_SINGLE_PROJECT_SUCCESS":
      return {
        ...state,
        loading: false,
        singleProject: action.payload,
      };
    case "GET_SINGLE_PROJECT_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "GET_PROJECTS_BY_COLLEGE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_PROJECTS_BY_COLLEGE_SUCCESS":
      return {
        ...state,
        loading: false,
        collageProjects: action.payload,
      };
    case "GET_PROJECTS_BY_COLLEGE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case "ADD_GRADES_REQUEST":
        return {
          ...state,
          loading: true,
        };
      case "ADD_GRADES_SUCCESS":
        return {
          ...state,
          loading: false,
          singleProject: action.payload,
        };
      case "ADD_GRADES_ERROR":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
    default:
      return state;
  }
};
