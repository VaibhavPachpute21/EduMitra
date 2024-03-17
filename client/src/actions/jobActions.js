import axios from 'axios';
import { toast } from 'react-toastify';

//Action to get All Jobs
export const getAllJobs = () => async (dispatch) => {
    dispatch({ type: "GET_ALL_JOB_REQUEST" })
    try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/jobs/getAllJobs`);
        // console.log(res.data.jobs)
        dispatch({ type: "GET_ALL_JOB_SUCCESS", payload: res.data.jobs });
    } catch (error) {
        dispatch({ type: "GET_ALL_JOB_ERROR", payload: error });
        toast.error(error.response ? error.response.data.message : "Failed to load Jobs");
    }
}

//Action to add New Job
export const addNewJob = (job) => async (dispatch) => {
    dispatch({ type: "ADD_JOB_REQUEST" })
    try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/jobs/addNewJob`, job);
        // console.log(res.data.jobs)
        dispatch({ type: "ADD_JOB_SUCCESS" });
        toast.success("Job posted!!")
    } catch (error) {
        dispatch({ type: "ADD_JOB_ERROR", payload: error });
        toast.error(error.response ? error.response.data.message : "Failed to post Jobs");
    }
}

// Action to get Single Job
export const getSingleJob = (jobId) => async (dispatch) => {
    dispatch({ type: "GET_SINGLE_JOB_REQUEST" });
    try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/jobs/getJob/${jobId}`);
        dispatch({ type: "GET_SINGLE_JOB_SUCCESS", payload: res.data.job });
    } catch (error) {
        dispatch({ type: "GET_SINGLE_JOB_ERROR", payload: error });
        toast.error(error.response ? error.response.data.message : "Failed to fetch the Job");
    }
};

//Action to apply for job
export const applyForJOb = (jobId, applicant) => async (dispatch) => {
    dispatch({ type: "APPLY_JOB_REQUEST" })
    try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/jobs/apply/${jobId}`, applicant);
        dispatch({ type: "APPLY_JOB_SUCCESS", });
        toast.success("Applied successfully!");
    } catch (error) {
        dispatch({ type: "APPLY_JOB_ERROR", payload: error });
        toast.error(error.response ? error.response.data.message : "Failed to apply");
    }
};

//Action to apply for job
export const getMyAppliedJObs = (userId) => async (dispatch) => {
    dispatch({ type: "GET_APPLIED_JOB_REQUEST" })
    try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/jobs/appliedJobs/${userId}`);
        dispatch({ type: "GET_APPLIED_JOB_SUCCESS", payload: res.data.jobs });
    } catch (error) {
        dispatch({ type: "GET_APPLIED_JOB_ERROR", payload: error });
        toast.error(error.response ? error.response.data.message : "Jobs not found.");
    }
};

//Action to apply for job
export const getMyPostedJObs = (userToken) => async (dispatch) => {
    dispatch({ type: "GET_POSTED_JOB_REQUEST" })
    try {
        // console.log(userToken)
        const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/jobs/userJobs`,{}, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        dispatch({ type: "GET_POSTED_JOB_SUCCESS", payload: res.data.jobs });
    } catch (error) {
        dispatch({ type: "GET_POSTED_JOB_ERROR", payload: error });
        toast.error(error.response ? error.response.data.message : "Jobs not found.");
    }
};

