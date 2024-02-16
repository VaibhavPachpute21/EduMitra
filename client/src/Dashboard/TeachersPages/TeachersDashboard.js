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
                <div className="text-center text-white-50 border rounded border-0 p-3" style={{ backgroundColor: '#B0522A' }}>
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
                <iframe title="Report Section" width="100%" height="500" src="https://app.powerbi.com/view?r=eyJrIjoiZDVlOWM5MzctZWJjYS00OThjLWE4MTItY2EyM2NkZjhlMzQ2IiwidCI6ImUzNzJhNzI2LTNiYzMtNDdiOS05MWU0LWE0M2E5ZmU2YzQ2YyJ9" frameborder="0" allowFullScreen="true"></iframe>
            </div>

            <div className="container py-xl-5">
                <div className="row mb-5" style={{ backgroundColor: '#F6BC8C', padding: '12px', border: '2px solid #B0522A' }}>
                    <div className="col-sm-10 col-md-7 col-lg-8">
                        <h2 className='heading2'>Projects by Students of {currentUser.user.college}</h2>
                    </div>
                </div>
                <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">

                    {collageProjects.map((project) => {
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
                                    </div>
                                    <Link className='btn button2 rounded-5' to={`/Dashboard/Project/${project._id}`}>Grade it!</Link>
                                    <div className='textStyle2 text-black mt-2'>{project.grades.CQ && project.grades.EC && project.grades.PC != null ? <span>Already Graded!</span> : ""}</div>
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