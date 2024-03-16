const jobInitialState = {
    loading: false,
    allJobs: [],
    myAppliedJobs: [],
    myPostedJobs: [],
    singleJob: null,
    error: null,
};

export const jobReducer = (state = jobInitialState, action) => {
    switch (action.type) {
        case "GET_ALL_JOB_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_ALL_JOB_SUCCESS":
            return {
                ...state,
                loading: false,
                allJobs: action.payload,
            };
        case "GET_ALL_JOB_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "ADD_JOB_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "ADD_JOB_SUCCESS":
            return {
                ...state,
                loading: false,
            };
        case "ADD_JOB_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "GET_SINGLE_JOB_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_SINGLE_JOB_SUCCESS":
            return {
                ...state,
                loading: false,
                singleJob: action.payload,
            };
        case "GET_SINGLE_JOB_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "APPLY_JOB_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "APPLY_JOB_SUCCESS":
            return {
                ...state,
                loading: false,
            };
        case "APPLY_JOB_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "GET_APPLIED_JOB_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_APPLIED_JOB_SUCCESS":
            return {
                ...state,
                loading: false,
                myAppliedJobs: action.payload,
            };
        case "GET_APPLIED_JOB_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "GET_POSTED_JOB_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_POSTED_JOB_SUCCESS":
            return {
                ...state,
                loading: false,
                myPostedJobs: action.payload,
            };
        case "GET_POSTED_JOB_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
