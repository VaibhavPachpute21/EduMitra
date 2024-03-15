import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDashboardData } from '../../actions/projectActions'
import { getUsersByCollage } from '../../actions/userActions'
import Loading from '../../components/Common/Loading'

const ProfessionalDashboard = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userLoginReducer)
    const { currentUser } = userData;
    const projectsData = useSelector((state) => state.projectReducer);
    const { loading, hrDashboardData, error } = projectsData;
    useEffect(() => {
        dispatch(getDashboardData())
        console.log(hrDashboardData)
    }, [dispatch])
    return (<>
        {loading ? <Loading /> : <section>
            <div className="container py-4 py-xl-5">
                <div className="text-center text-white-50 border rounded border-0 p-3" style={{ backgroundColor: '#B0522A' }}>
                    <div className="row row-cols-2 row-cols-md-3">
                        <div className="col">
                            <div className="p-3">
                                <h4 className="display-5 fw-bold text-white mb-0">10</h4>
                                <p className="mb-0">No of Users</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="p-3">
                                <h4 className="display-5 fw-bold text-white mb-0">8</h4>
                                <p className="mb-0">Project Uploads</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="p-3">
                                <h4 className="display-5 fw-bold text-white mb-0 fs-3">4</h4>
                                <p className="mb-0">No of Colleges</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-1 py-xl-5 text-center">
                <iframe title="EduMitra" width="100%" height="700" src="https://app.powerbi.com/view?r=eyJrIjoiZDVlOWM5MzctZWJjYS00OThjLWE4MTItY2EyM2NkZjhlMzQ2IiwidCI6ImUzNzJhNzI2LTNiYzMtNDdiOS05MWU0LWE0M2E5ZmU2YzQ2YyJ9&pageName=ReportSection" frameborder="0" allowFullScreen="true"></iframe>
            </div>

            <div className="container py-xl-5">
                <div className="row mb-5" style={{ backgroundColor: '#F6BC8C', padding: '12px', border: '2px solid #B0522A' }}>
                    <div className="col-sm-10 col-md-7 col-lg-8">
                        <h2 className='heading2'>Latest Projects</h2>
                    </div>
                </div>
                <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                    {hrDashboardData === null ? <><Loading /> </> : hrDashboardData.latestProjects && hrDashboardData.latestProjects.map((project) => {
                        return <div className="col-xxl-3">
                            <Link to={`/Project/${project._id}`} className="text-decoration-none text-black">
                                <div className='cardStyle2'>
                                    <figure>
                                        <img className="rounded img-fluid d-block w-100 fit-cover" style={{ height: '200px' }} src={project.projectImages[0]} alt="Project" />
                                    </figure>
                                    <div className="pt-2">
                                        <h4 className='heading3 text-black fs-4 fw-bold'><span>{project.pTitle}</span></h4>
                                        <h4 className='textStyle1 text-muted text-black'><strong>Domain:</strong>{project.domain}</h4>
                                        <p className='mb-0 textStyle1 text-black'><span><strong>Submitted by:</strong> {project.creatorInfo.name}</span></p>
                                        <p className='textStyle1 text-black'><span><strong>Submitted on:</strong> {project.createdAt.split('T')[0]}</span></p>
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
            </div>
        </section>
        }</>
    )
}

export default ProfessionalDashboard