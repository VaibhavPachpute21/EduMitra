import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllJobs,getMyAppliedJObs } from '../actions/jobActions'
import Loading from '../components/Common/Loading'
import { Link } from 'react-router-dom'

const AllJobList = () => {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.userLoginReducer)
    const { currentUser } = userData;
    const jobsData = useSelector((state) => state.jobReducer);
    const { loading, allJobs,myAppliedJobs, error } = jobsData;

    useEffect(() => {
        // console.log(currentUser.token)
        dispatch(getAllJobs())
        dispatch(getMyAppliedJObs(currentUser.user._id))
        // console.log(allJobs)
    }, [dispatch])

    return (
        <>
            {loading ? <Loading /> : <section>
                <div className="container py-xl-5">
                    <div className="row mb-5" style={{ backgroundColor: '#F6BC8C', padding: '12px', border: '2px solid #B0522A' }}>
                        <div className="col-sm-10 col-md-7 col-lg-8">
                            <h2 className='heading2'>Apply for Jobs</h2>
                        </div>
                    </div>
                    <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                        {allJobs === null ? <><Loading /> </> : allJobs && allJobs.map((job) => {
                            return <div className="col-xxl-3">
                                <div className="text-decoration-none text-black">
                                    <div className='cardStyle1'>
                                        <div className="pt-2">
                                            <h4 className='heading3 text-black fs-4 fw-bold'><span>{job.jobName}</span></h4>
                                            <h4 className='textStyle1 text-muted text-black'><strong>Type: </strong>{job.jobType}</h4>
                                            <h4 className='textStyle1 text-muted text-black'><strong>Organisation: </strong>{job.companyName}</h4>
                                            <h4 className='textStyle1 text-muted text-black'><strong>Last Date to Apply: </strong>{job.applyDate.split("T")[0]}</h4>
                                            <h4 className='textStyle1 text-muted text-black'><strong>No of applicants: </strong>{job.applicants.length}</h4>
                                            <Link className='btn button2 py-0 px-1 mt-2 rounded' to={`/Dashboard/Jobs/${job._id}`}>View Details</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>

                {myAppliedJobs && myAppliedJobs.length>0 && <div className="container py-xl-5">
                    <div className="row mb-5" style={{ backgroundColor: '#F6BC8C', padding: '12px', border: '2px solid #B0522A' }}>
                        <div className="col-sm-10 col-md-7 col-lg-8">
                            <h2 className='heading2'>My Applied Jobs</h2>
                        </div>
                    </div>
                    <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                        {loading ? <><Loading /> </> : myAppliedJobs &&  myAppliedJobs.map((job) => {
                            return <div className="col-xxl-3">
                                <div className="text-decoration-none text-black">
                                    <div className='cardStyle1'>
                                        <div className="pt-2">
                                            <h4 className='heading3 text-black fs-4 fw-bold'><span>{job.jobName}</span></h4>
                                            <h4 className='textStyle1 text-muted text-black'><strong>Type: </strong>{job.jobType}</h4>
                                            <h4 className='textStyle1 text-muted text-black'><strong>Organisation: </strong>{job.companyName}</h4>
                                            <h4 className='textStyle1 text-muted text-black'><strong>Last Date to Apply: </strong>{job.applyDate.split("T")[0]}</h4>
                                            <h4 className='textStyle1 text-muted text-black'><strong>No of applicants: </strong>{job.applicants.length}</h4>
                                            <Link className='btn button2 py-0 px-1 mt-2 rounded' to={`/Dashboard/Jobs/${job._id}`}>View Details</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>}

                
            </section>
            }</>
    )
}

export default AllJobList