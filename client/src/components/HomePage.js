import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from '../actions/cartActions'
import { getAllProjects } from '../actions/projectActions'
import { Link } from 'react-router-dom'

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
        <div>
            <section class="py-4" style={{ background: 'url("https://q9k6x7m8.stackpathcdn.com/assets/home/homepage/header/desktop-illustration-night-8a30863e0990a34b55cf882b1ee789d5e27dbbb286d9b7f90705322c67fe44f8.png") right / cover no-repeat, rgba(255,255,255,0)', padding: '0px 0px' }}>
                <div class="container-fluid" style={{ position: 'relative', height: '100%', width: '100%', padding: '0px', marginTop: '-24px', marginBottom: "-24px", filter: 'saturate(100%)', backdropFilter: 'blur(2px)' }}>
                    <div class="text-start p-4 p-lg-5" style={{ height: "400px" }}>
                        <p class="fw-bold text-primary mb-2" style={{ borderColor: "rgb(0,0,0)" }}><span style={{ color: "rgb(129, 91, 91)" }}>Proud to introduce</span></p>
                        <h1 class="fw-bold mb-4" style={{ color: "rgb(0,0,0)" }}>The Platform for Geeks,<br />to Learn &amp; Grow</h1>
                        <Link class="btn btn-primary fs-5 me-2 py-2 px-4" type="button" style={{ borderRadius: "0px" }}to={'/Register'}>Join The Community</Link>
                    </div>
                </div>
            </section>
            <section class="newsletter-subscribe py-4 py-xl-5" style={{ padding: "0px 0px;" }}>
                <div class="container">
                    <form class="d-flex justify-content-center flex-wrap" method="post">
                        <div class="d-flex d-sm-flex flex-row align-items-center align-items-sm-center mb-3" style={{ width: "50%", minWidth: "50%", borderRadius: '0px', display: "flex" }}><input class="form-control" type="email" name="email" placeholder="Search Projects" style={{ borderRadius: "0px" }} /></div>
                        <div class="mb-3"><button class="btn btn-primary ms-2 " type="submit" style={{ borderRadius: 0 }}>Search Projects</button></div>
                    </form>
                </div>
            </section>

            <div class="container py-4 py-xl-5">
                <div class="row mb-5">
                    <div class="col-md-8 col-xl-6 text-center mx-auto">
                        <h2>Latest Projects</h2>
                    </div>
                </div>
                <div class="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                    {loading ? <>Loading</> : projects.slice(0, 3).map((project) => {
                        return <div class="col">
                            <Link to={`/Project/${project._id}`} className="text-decoration-none text-black">
                                <div class="card"><img class="card-img-top w-100 d-block fit-cover" style={{ height: "200px" }} src={project.projectImages[0]} />
                                    <div class="card-body p-4">
                                        {/* <p class="text-primary card-text mb-0">Entertainment</p> */}
                                        <h4 class="card-title">{project.pTitle}</h4>
                                        <p class="card-text">{project.shortDescription}</p>
                                        <div class="d-flex"><img class="rounded-circle flex-shrink-0 me-3 fit-cover" width="50" height="50" src={project.creatorInfo.profilePic} />
                                            <div>
                                                <p class="fw-bold mb-0">{project.creatorInfo.name}</p>
                                                <p class="text-muted mb-0">{project.creatorInfo.college}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    })}
                </div>
                <div class="row text-center">
                    <div class="col" style={{ padding: "12px" }}><Link class="btn btn-primary fs-5 me-2 py-2 px-4 rounded-0" type="button" to={'/Projects'}>View More</Link></div>
                </div>
            </div>
        </div>
    )
}

export default HomePage