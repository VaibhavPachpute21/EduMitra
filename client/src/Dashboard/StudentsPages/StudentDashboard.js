import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProjects } from '../../actions/projectActions'
import { Link } from 'react-router-dom';


export const StudentDashboard = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userLoginReducer)
    const { currentUser } = userData;
    const projectsData = useSelector((state) => state.projectReducer);
    const { loading, userProjects, error } = projectsData;
    useEffect(() => {
        dispatch(getUserProjects(currentUser.token))
        console.log(userProjects)
    }, [dispatch])


    return (
        <div>
            <section className='dashboard'>
                <div className="container py-4 py-xl-5">
                    <div className="text-center text-white-50 border rounded border-0 p-3" style={{ backgroundColor: '#B0522A' }}>
                        <div className="row row-cols-2 row-cols-md-4">
                            <div className="col">
                                <div className="p-3">
                                    <h4 className="display-5 fw-bold text-white mb-0">123+</h4>
                                    <p className="mb-0">Profile Views</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="p-3">
                                    <h4 className="display-5 fw-bold text-white mb-0">5</h4>
                                    <p className="mb-0">Project Uploads</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="p-3">
                                    <h4 className="display-5 fw-bold text-white mb-0">67+</h4>
                                    <p className="mb-0">Total Likes</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="p-3">
                                    <h4 className="display-5 fw-bold text-white mb-0">89</h4>
                                    <p className="mb-0">Your Rank</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container py-4 py-xl-5">
                    <h2 className='heading1'>Hello {currentUser.user.name}!</h2>
                </div>

                <div className="container py-4 py-xl-5">
                    <div className="row mb-5" style={{ backgroundColor: '#F6BC8C', padding: '12px', border: '2px solid #B0522A' }}>
                        <div className="col-sm-10 col-md-7 col-lg-8">
                            <h2 className='heading2'>Your Projects</h2>
                        </div>
                        <div className="col" style={{ textAlign: 'right' }}>
                            <Link className="btn button1 fs-5 me-2 py-2 px-4" to={'/StudentDashboard/AddNewProject'} style={{ borderRadius: '0px' }}>
                                Add New Project
                            </Link>
                        </div>
                    </div>
                    <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                        {userProjects.map((project) => {
                            return <div className="col-xxl-3">
                                <Link to={`/Project/${project._id}`} className="text-decoration-none text-black">
                                    <div className='cardStyle2 spinning'>
                                        <figure>
                                            <img className="rounded img-fluid d-block w-100 fit-cover" style={{ height: '200px' }} src={project.projectImages[0]} alt="Project" />
                                        </figure>
                                        <div className='mt-2 px-2'>
                                            <h4 className='heading3 text-black'>{project.pTitle}</h4>
                                            <p className='mb-0 textStyle1 text-black' dangerouslySetInnerHTML={{ __html: project.shortDescription }}></p>
                                            <p className='textStyle1'>{project.grades.CQ && project.grades.EC && project.grades.PC != null ? <><strong>Grades:<br /></strong> Content: {project.grades.CQ} | Creativity: {project.grades.EC} | Presentation: {project.grades.PC}</> : ""}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        })}
                    </div>
                </div>
                <div className="container py-4 py-xl-5">
                    <div className="row mb-5" style={{ backgroundColor: '#F6BC8C', padding: '12px', border: '2px solid #B0522A' }}>
                        <div className="col-sm-10 col-md-7 col-lg-8">
                            <h2 className='heading2'>Trending Projects</h2>
                        </div>
                        <div className="col" style={{ textAlign: 'right' }}>
                            <Link className="btn button1 fs-5 me-2 py-2 px-4" to={'/Projects'}>
                                Explore more
                            </Link>
                        </div>
                    </div>
                    <div className="row gy-4 row-cols-1 row-cols-md-2">
                        <div className="col">
                            <a className="text-decoration-none text-black" href="">
                                <div className="d-flex flex-column flex-lg-row cardStyle1 ">
                                    <div className="w-100">
                                        <figure>
                                            <img className="rounded img-fluid d-block w-100 fit-cover" style={{ height: '200px' }} src="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/255/061/datas/gallery.jpg" alt="Trending Project" />
                                        </figure>
                                    </div>
                                    <div className="py-4 py-lg-0 px-lg-4">
                                        <h4>empath.ly</h4>
                                        <p>empath.ly uses machine learning to analyze emotions during video calls or metaverse activities. We empower employers, marketers, developers, and the visually impaired to empathize remotely.</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        {/* Repeat this card section for each trending project */}
                    </div>
                </div>
            </section>
        </div>
    )
}
