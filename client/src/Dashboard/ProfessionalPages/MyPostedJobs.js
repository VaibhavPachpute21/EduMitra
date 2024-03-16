import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyPostedJObs } from '../../actions/jobActions'
import Loading from '../../components/Common/Loading'
import { Link } from 'react-router-dom'

const MyPostedJobs = () => {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.userLoginReducer)
    const { currentUser } = userData;
    const jobsData = useSelector((state) => state.jobReducer);
    const { loading, myPostedJobs, error } = jobsData;

    useEffect(() => {
        console.log(currentUser.token)
        dispatch(getMyPostedJObs(currentUser.token))
        console.log(myPostedJobs)
    }, [dispatch])

    return (
        <>
            {loading ? <Loading /> : <section>
                <div className="container py-xl-5">
                    <div className="row mb-5" style={{ backgroundColor: '#F6BC8C', padding: '12px', border: '2px solid #B0522A' }}>
                        <div className="col-sm-10 col-md-7 col-lg-8">
                            <h2 className='heading2'>My Posted Jobs</h2>
                        </div>
                    </div>
                    <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                        {myPostedJobs === null ? <><Loading /> </> : myPostedJobs && myPostedJobs.map((job) => {
                            return <div className="col-xxl-3">
                                <div className="text-decoration-none text-black">
                                    <div className='cardStyle1'>
                                        <div className="pt-2">
                                            <h4 className='heading3 text-black fs-4 fw-bold'><span>{job.jobName}</span></h4>
                                            <h4 className='textStyle1 text-muted text-black'><strong>Type: </strong>{job.jobType}</h4>
                                            <h4 className='textStyle1 text-muted text-black'><strong>Organisation: </strong>{job.companyName}</h4>
                                            <h4 className='textStyle1 text-muted text-black'><strong>Last Date to Apply: </strong>{job.applyDate.split("T")[0]}</h4>
                                            <h4 className='textStyle1 text-muted text-black'><strong>No of applicants: </strong>{job.applicants.length}</h4>
                                            <Link className='btn button2 py-0 px-1 mt-2 rounded '>View Details</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>

                {/* <div className="container py-xl-5">
                <div className="row mb-5" style={{ backgroundColor: '#F6BC8C', padding: '12px', border: '2px solid #B0522A' }}>
                    <div className="col-sm-10 col-md-7 col-lg-8">
                        <h2 className='heading2'>Popular Projects</h2>
                    </div>
                </div>
                <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                    {hrDashboardData === null ? <><Loading /> </> : hrDashboardData.popularProjects && hrDashboardData.popularProjects.map((project) => {
                        return <div className="col-xxl-3">
                            <Link to={`/Project/${project._id}`} className="text-decoration-none text-black">
                                <div className='cardStyle2'>
                                    <figure>
                                        <img className="rounded img-fluid d-block w-100 fit-cover" style={{ height: '200px' }} src={project.projectImages[0]} alt="Project" />
                                    </figure>
                                    <div className="pt-2">
                                        <h4 className='heading3 text-black fs-4 fw-bold'><span>{project.pTitle}</span></h4>
                                        <p className='mb-0 textStyle1 text-black'><span><strong>Submitted by:</strong> {project.creatorInfo.name}</span></p>
                                        <p className='textStyle1 text-black'><span><strong>Submitted on:</strong> {project.createdAt.split('T')[0]}</span></p>
                                        <p className="text-start textStyle2 text-black">{project.builtWith.split(',').map((item, index) => (
                                            <span className="m-1 badge textStyle2" style={{ backgroundColor: 'var(--TERRACOTTA)' }} key={index}>{item}</span>
                                        ))}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    })}
                </div>
            </div>

            <div className="container py-xl-5">
                <div className="row mb-5" style={{ backgroundColor: '#F6BC8C', padding: '12px', border: '2px solid #B0522A' }}>
                    <div className="col-sm-10 col-md-7 col-lg-8">
                        <h2 className='heading2'>Popular Users</h2>
                    </div>
                </div>
                <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                    {hrDashboardData === null ? <><Loading /> </> : hrDashboardData.popularUsers && hrDashboardData.popularUsers.map((user) => {
                        return <div className="col-xxl-3">
                            <Link to={`/Dashboard/User/${user._id}`} className="text-decoration-none text-black">
                                <div className='cardStyle2'>
                                    <figure>
                                        <img className="rounded img-fluid d-block w-100 fit-cover" style={{ height: '200px' }} src={user.profilePic} alt="Project" />
                                    </figure>
                                    <div className="pt-2">
                                        <h4 className='heading3 text-black fs-4 fw-bold'><span>{user.name}</span></h4>
                                        {user.skills && user.skills.length > 0 && <p className='mb-0 textStyle1 text-black'><span><strong>Skills:</strong> {user.skills.map((skill) => { return <><span className=''>{skill.value}. </span></> })}</span></p>}
                                        <p className='mb-0 textStyle1 text-black'><span><strong>Collage:</strong> {user.college}</span></p>
                                        <p className='textStyle1 text-black'><span><strong>Contact:</strong> {user.email}</span></p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    })}
                </div>
            </div> */}
            </section>
            }</>
    )
}

export default MyPostedJobs