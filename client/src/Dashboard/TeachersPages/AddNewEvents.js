import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProjectsByCollegeName } from '../../actions/projectActions'

const AddNewEvents = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userLoginReducer)
    const { currentUser } = userData;
    const projectsData = useSelector((state) => state.projectReducer);
    const { loading, collageProjects, error } = projectsData;
    useEffect(() => {
        dispatch(getProjectsByCollegeName(currentUser.user.college))
        console.log(collageProjects)
    }, [dispatch])
    return (
        <section>
            <div className="container py-4 py-xl-5">
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

export default AddNewEvents