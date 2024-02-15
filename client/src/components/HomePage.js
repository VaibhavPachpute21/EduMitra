import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjects } from '../actions/projectActions'
import { Link } from 'react-router-dom'
import '../styles/Home.css'
import '../styles/App.css'

const HomePage = () => {
    const dispatch = useDispatch()
    const currentval = useSelector((state) => state.counterReducer.count);
    const projectsData = useSelector((state) => state.projectReducer);
    const { loading, projects, error } = projectsData;

    useEffect(() => {
        dispatch(getAllProjects())
        console.log(projects)
    }, [dispatch])

    return (
        <div className='home'>
            <section class="py-2 hero">
                <div class="container">
                    <div class="text-start py-5 py-lg-5 mt-5">
                        <p class="fw-bold mb-2 textStyle2"><span style={{ color: "#fff" }}>Proud to Introduce</span></p>
                        <h1 class="fw-bold mb-4 heading1" style={{ color: "#fff" }}>The Platform for Geeks,<br />to Learn &amp; Grow!!</h1>
                        <Link class="btn button1 me-2 py-2 px-4" type="button" to={'/Register'}>Join The Community</Link>
                    </div>
                </div>
            </section>
            <section class="newsletter-subscribe py-4 py-xl-5" style={{ padding: "0px 0px;", backgroundColor: '#F6BC8C' }}>
                <div class="container">
                    <form class="d-flex justify-content-center flex-wrap">
                        <div class="d-flex d-sm-flex flex-row align-items-center align-items-sm-center mb-3" style={{ width: "50%", minWidth: "50%", borderRadius: '0px', display: "flex" }}><input class="form-control" type="text" name="search" placeholder="Search Projects" style={{ borderRadius: "0px" }} /></div>
                        <div class="mb-3"><button class="btn button1 ms-2 " style={{ borderRadius: 0 }}>Search Projects</button></div>
                    </form>
                </div>
            </section>

            <div class="container py-4 py-xl-5">
                <div class="row mb-5">
                    <div class="text-center mx-auto">
                        <h2 className='heading2'>Latest Projects</h2>
                    </div>
                </div>
                <div className=" cards">
                    {loading ? <>Loading</> : projects.slice(0, 3).map((project) => {
                        return <div className="col card">
                            <Link to={`/Project/${project._id}`}>
                                <figure>
                                    <img src={project.projectImages[0]} class="card__image fit-contain" alt="IMG" />
                                </figure>
                                <div class="card__overlay">
                                    <div class="card__header">
                                        <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                                        <div className="row">
                                            <div class="col d-flex pe-0">
                                                <img class="card__thumb  rounded-circle flex-shrink-0 me-3 fit-cover" width="30" height="30" src={project.creatorInfo.profilePic} />
                                                <div >
                                                    <p class="mb-0 heading3">{project.creatorInfo.name}</p>
                                                    <p class="mb-0 textStyle2">{project.creatorInfo.college}</p>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <p class="mb-0 textStyle2">Entertainment</p>
                                                <h4 class="heading3">{project.pTitle}</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='p-3'>
                                        <div className='card__description'></div>
                                        <p class="textStyle3" style={{textAlign:'justify'}}>{project.shortDescription}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    })}
                </div>
                <div class="row text-center">
                    <div class="col" style={{ padding: "12px" }}><Link class="btn button2 fs-5 me-2 py-2 px-4 rounded-0" type="button" to={'/Projects'}>View More</Link></div>
                </div>
            </div>
        </div>
    )
}

export default HomePage