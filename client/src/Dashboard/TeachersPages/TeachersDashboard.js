import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProjectsByCollegeName, } from '../../actions/projectActions'
import { getUsersByCollage } from '../../actions/userActions'

const TeachersDashboard = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userLoginReducer)
    const { currentUser } = userData;
    const projectsData = useSelector((state) => state.projectReducer);
    const { loading, collageProjects, error } = projectsData;
    const collageusList = useSelector(state => state.getUsersByCollageReducer);
    const { allColleagues } = collageusList;
    useEffect(() => {
        dispatch(getProjectsByCollegeName(currentUser.user.college))
        console.log(collageProjects)
        dispatch(getUsersByCollage(currentUser.user.college))
        console.log(allColleagues);
    }, [dispatch])
    return (
        <section>
            {allColleagues && <div className="container py-4 py-xl-5">
                <div className="text-center text-white-50 bg-primary border rounded border-0 p-3">
                    <div className="row row-cols-2 row-cols-md-3">
                        <div className="col">
                            <div className="p-3">
                                <h4 className="display-5 fw-bold text-white mb-0">{allColleagues.length.toString()}</h4>
                                <p className="mb-0">Total Collage User</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="p-3">
                                <h4 className="display-5 fw-bold text-white mb-0">{collageProjects.length.toString()}</h4>
                                <p className="mb-0">Project Uploads</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="p-3">
                                <h4 className="display-5 fw-bold text-white mb-0">{currentUser.user.college}</h4>
                                <p className="mb-0">Collage</p>
                            </div>
                        </div>
                        {/* <div className="col">
                            <div className="p-3">
                                <h4 className="display-5 fw-bold text-white mb-0">89</h4>
                                <p className="mb-0">Your Rank</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>}

            <div className="container py-1 py-xl-5 text-center">
            <iframe title="Report Section" width="100%" height="500" src="https://app.powerbi.com/view?r=eyJrIjoiMGIzMjZhMTItODkzOS00ODlhLTk4NDItMTgxNjFmMzgzNTJjIiwidCI6ImUzNzJhNzI2LTNiYzMtNDdiOS05MWU0LWE0M2E5ZmU2YzQ2YyJ9" frameborder="0" allowFullScreen="true"></iframe>
                {/* <iframe title="EduMitra" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=c2f6cf50-22e5-4b2e-88fe-f26c3307b09c&autoAuth=true&ctid=9f42fee1-9957-4b0e-8e94-b9b7d20f9113" frameborder="0" allowFullScreen="true"></iframe>
                <img src='assets/img/Dashboard.png' className='m-auto w-100 fit-cover' alt='Dashboard' width={'100%'} height={'100%'}/> */}
                {/* <a className='btn btn-success rounded-0' target='_blank' href='https://app.powerbi.com/reportEmbed?reportId=c2f6cf50-22e5-4b2e-88fe-f26c3307b09c&autoAuth=true&ctid=9f42fee1-9957-4b0e-8e94-b9b7d20f9113'>View Report</a> */}
            </div>

            <div className="container py-xl-5">
                <div className="row mb-5" style={{ background: 'var(--bs-body-bg)', padding: '12px', boxShadow: '0px 4px 6px 1px rgba(43,49,54,0.35)', borderRadius: '5px' }}>
                    <div className="col-sm-10 col-md-7 col-lg-8">
                        <h2>Projects by Students of {currentUser.user.college}</h2>
                    </div>
                </div>
                <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">

                    {collageProjects.map((project) => {
                        return <div className="col-xxl-3">
                            <Link to={`/Project/${project._id}`} className="text-decoration-none text-black">
                                <div style={{ borderRadius: '5px', padding: '10px', background: 'var(--bs-body-bg)', boxShadow: '0px 0px 5px 2px var(--bs-dark-border-subtle)' }}>
                                    <img className="rounded img-fluid d-block w-100 fit-cover" style={{ height: '200px' }} src={project.projectImages[0]} alt="Project" />
                                    <div className="pt-2">
                                        <h4><span style={{ color: 'rgb(0, 0, 0)' }}>{project.pTitle}</span></h4>
                                        <p className='mb-0'><span style={{ color: 'rgb(0, 0, 0)' }}>Submitted by <strong>{project.creatorInfo.name}</strong></span></p>
                                        <p><span style={{ color: 'rgb(0, 0, 0)' }}>Submitted on <strong>{project.createdAt.split('T')[0]}</strong></span></p>
                                    </div>
                                    <Link className='btn btn-primary rounded-0' to={`/Dashboard/Project/${project._id}`}>Grade it!</Link>
                                    <div>{project.grades.CQ && project.grades.EC && project.grades.PC != null ? <span>Already Graded!</span> : ""}</div>
                                </div>
                            </Link>
                        </div>
                    })}

                </div>
            </div>
        </section>
    )
}

export default TeachersDashboard