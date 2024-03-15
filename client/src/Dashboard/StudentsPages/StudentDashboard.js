import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProjects } from '../../actions/projectActions'
import { Link, json } from 'react-router-dom';
import axios from 'axios';
const malePP = ["https://img.freepik.com/premium-vector/man-character_665280-46969.jpg", "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg", "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg", "https://img.freepik.com/free-vector/handsome-man_1308-85984.jpg", "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg"]
const femalePP = ["https://img.freepik.com/free-vector/3d-cartoon-young-woman-smiling-circle-frame-character-illustration-vector-design_40876-3100.jpg?size=626&ext=jpg", "https://img.freepik.com/free-vector/young-woman-white_25030-39552.jpg", "https://img.freepik.com/free-vector/young-woman-white_25030-39546.jpg", "https://img.freepik.com/premium-photo/cute-emoji-person-speaking-with-no-background-3_634278-1248.jpg", "https://img.freepik.com/free-vector/pop-art-fashion-beautiful-woman-cartoon_18591-52376.jpg"]


export const StudentDashboard = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userLoginReducer)
    const { currentUser } = userData;
    const projectsData = useSelector((state) => state.projectReducer);
    const { loading, userProjects, error } = projectsData;
    const [recommend_users, setRecommendUsers] = useState(null);
    useEffect(() => {
        dispatch(getUserProjects(currentUser.token))
        // console.log(userProjects)
        getRecomandedUsers();
    }, [dispatch])

    async function getRecomandedUsers() {
        const selectedSkill = currentUser.user.skills && currentUser.user.skills.length > 0 ? currentUser.user.skills[0].value : "PHP";
        fetch(`${process.env.REACT_APP_FLASK_SERVER}/recommend_users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'selected_skill': selectedSkill
            }),
        })
            .then(response => response.json()).then(data => setRecommendUsers(data))
            .catch(error => console.error('Error fetching data:', error));
    }

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
                            <Link className="btn button1 fs-5 me-2 py-2 px-4" to={'/Dashboard/AddNewProject'} style={{ borderRadius: '0px' }}>
                                Add New Project
                            </Link>
                        </div>
                    </div>
                    <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                        {userProjects.map((project) => {
                            return <div className="col-xxl-3">
                                <Link to={`/Project/${project._id}`} className="text-decoration-none text-black">
                                    <div className='cardStyle2'>
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
                            <h2 className='heading2'>Recommend Users</h2>
                        </div>
                        <div className="col" style={{ textAlign: 'right' }}>
                            <Link className="btn button1 fs-5 me-2 py-2 px-4" to={'/Dashboard/Peers'}>
                                Explore more
                            </Link>
                        </div>
                    </div>
                    <div className="row gy-4 row-cols-1 row-cols-md-2">
                        {recommend_users && recommend_users.map((user) => {
                            return <>
                                <div className="col">
                                    <a className="text-decoration-none text-black">
                                        <div className="d-flex flex-column flex-lg-row cardStyle1 ">
                                            <div className="col-4">
                                                <figure>
                                                    <img className="d-block w-100 bg-light" style={{ height: '100%', width: '50%', objectFit: 'contain' }}
                                                        src={user.gender == "Male" ? malePP[Math.floor(Math.random() * malePP.length)] : user.gender == "Female" ? femalePP[Math.floor(Math.random() * femalePP.length)] : "https://cdn-icons-png.flaticon.com/512/3106/3106773.png"} alt="User" />
                                                </figure>
                                            </div>
                                            <div className="py-4 py-lg-0 px-lg-4 d-flex align-items-center">
                                                <div>
                                                    <h4 className='heading2 fs-5 mb-0'>Name: {user.name}</h4>
                                                    <p className='textStyle2 text-black mb-0'>Mail: {user.email}</p>
                                                    <p className='textStyle2 text-black mb-0'>Phone:{user.phone}</p>
                                                    <p className='textStyle2 text-black mb-0'>College: {user.college}</p>
                                                    <p className='textStyle2 text-black mb-0'>City: {user.city}</p>
                                                    <p className='textStyle2 text-black'>Gender:{user.gender}</p>
                                                    <Link to={'/Dashboard/Peers'} className='btn button1'>Connect</Link>
                                                </div>

                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </>
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
                            <Link className="text-decoration-none text-black" to={'/Projects'}>
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
                            </Link>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}
