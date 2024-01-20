import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from '../actions/userActions';
import { getUserProjects, getProjectsByUserId } from '../actions/projectActions'
import { useParams } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const { userID } = useParams();
  const projectsData = useSelector((state) => state.projectReducer)
  const currentUser = useSelector(state => state.userLoginReducer.currentUser)
  const { userProjects } = projectsData;
  const { user } = currentUser;
  const [editProfile, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    college: '',
    city: '',
    skills: [],
    social_acc: { linkedin: '', github: '' }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(":::" + currentUser.user.name);
    initialDataLoad()
    dispatch(getProjectsByUserId(userID))
    console.log(user);
  }, [dispatch]);

  function initialDataLoad() {
    setFormData({
      ...formData,
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      college: user.college,
    });
  }

  return (
    <div>
      {user && (
        <section>
          <div className="container">
            <h3 className="text-dark mb-4">Profile</h3>
            <div className="row mb-3">
              <div className="col-lg-4">
                <div className="card mb-3">
                  <div className="card-body text-center shadow">
                    <img
                      className="rounded-circle mb-3 mt-4"
                      src={user.profilePic}
                      width="160"
                      height="160"
                      alt="Profile"
                    />
                    <div className="mb-3">
                      {editProfile ? <button className="btn btn-primary btn-sm" type="button" onClick={() => { setEdit(!editProfile) }}>
                        Save
                      </button> : <button className="btn btn-primary btn-sm" type="button" onClick={() => { setEdit(!editProfile) }}>
                        Edit Profile
                      </button>}

                    </div>
                  </div>
                </div>

                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="text-primary fw-bold m-0">Skills</h6>
                  </div>
                  <div className="card-body">
                    <p className="text-start mb-0">{`Git,GitHub,React,MongoDB,Python,JavaScript,VSCode,HTML,CSS`.split(',').map((item, index) => (
                      <span className="m-1 badge text-bg-primary" key={index}>{item}</span>
                    ))}</p>
                  </div>
                </div>

                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="text-primary fw-bold m-0">Social accounts</h6>
                  </div>
                  <div className="card-body">
                    <div class="input-group mb-3">
                      <span class="input-group-text"><i class="bi bi-github"></i></span>
                      <input type="text" class="form-control" placeholder="Github profile" aria-label="github" id="github"
                        value={formData.social_acc.github} name="github" />
                    </div>
                    <div class="input-group mb-3">
                      <span class="input-group-text"><i class="bi bi-linkedin"></i></span>
                      <input type="text" class="form-control" placeholder="Linkedin profile" aria-label="linkedin" id="linkedin"
                        value={formData.social_acc.linkedin} name="linkedin" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col">
                    <div className="card shadow mb-3">
                      <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold">User Info</p>
                      </div>
                      <div className="card-body">
                        <form>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="username">
                                  <strong>Username</strong>
                                </label>
                                <input className="form-control shodow-0"
                                  type="text" id="username" placeholder="user.name"
                                  value={user.email} disabled={true} name="username"
                                />
                              </div>
                            </div>
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="email">
                                  <strong>Email Address</strong>
                                </label>
                                <input className="form-control"
                                  type="email" id="email" placeholder="user@example.com"
                                  name="email" value={formData.email}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="first_name">
                                  <strong>Name</strong>
                                </label>
                                <input className="form-control"
                                  type="text" id="name"
                                  placeholder="Your name" name="name"
                                  value={formData.name} onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="college">
                                  <strong>Collage</strong>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="college"
                                  placeholder="Collage Name"
                                  name="college"
                                  value={formData.college}
                                />
                              </div>
                            </div>
                          </div>
                          {/* <div className="mb-3">
                            <button
                              className="btn btn-primary btn-sm"
                              type="submit"
                            >
                              Save Settings
                            </button>
                          </div> */}
                        </form>
                      </div>
                    </div>
                    <div className="card shadow">
                      <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold">Contact Details</p>
                      </div>
                      <div className="card-body">
                        <form>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="address">
                              <strong>Address</strong>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="city"
                              placeholder="City, State"
                              name="city"
                              value={formData.city}
                            />
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="city">
                                  <strong>Phone Number</strong>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="phone"
                                  placeholder="1234567890"
                                  name="phone"
                                  value={formData.phone}
                                />
                              </div>
                            </div>
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="country">
                                  <strong>Email</strong>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="email"
                                  placeholder="user@example.com"
                                  name="email"
                                  value={formData.email}
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card shadow mb-5">
              <div className="card-header py-3">
                <p className="text-primary m-0 fw-bold">Projects Submitted</p>
              </div>
              <div className="card-body">
                <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                  {userProjects && userProjects.map((project) => {
                    return <div className="col-xxl-3">
                      <div className="text-decoration-none text-black" >
                        <div style={{ borderRadius: '5px', padding: '5px', background: 'var(--bs-body-bg)', boxShadow: '0px 0px 5px 2px var(--bs-dark-border-subtle)', height: '100%', }}>
                          <img className="rounded img-fluid d-block w-100 fit-cover" style={{ height: '200px' }} src={project.projectImages[0]} alt="Project" />
                          <div>
                            <h4>{project.pTitle}</h4>
                            <p className='mb-0' style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>{project.shortDescription}</p>
                            <p className="text-start mb-0">{`${project.builtWith}`.split(',').map((item, index) => (
                              <span className="m-1 badge text-bg-primary" key={index}>{item}</span>
                            ))}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  })}
                </div>
              </div>
            </div>

          </div>
        </section>
      )}
    </div>
  );
};

export default Profile;
