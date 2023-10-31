import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from '../actions/userActions';
import { getUserProjects,getProjectsByUserId } from '../actions/projectActions'
import { useParams } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const { userID } = useParams();
  const userData = useSelector((state) => state.getUsersByIDReducer);
  const projectsData = useSelector((state) => state.projectReducer)
  const currentUser = useSelector(state => state.userLoginReducer.currentUser)
  const { userProjects } = projectsData;
  const { loading, error, user } = userData;

  useEffect(() => {
    dispatch(getUserId(userID));
    dispatch(getProjectsByUserId(userID))
    console.log(user);
  }, [dispatch]);

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
                      <button className="btn btn-primary btn-sm" type="button">
                        Change Photo
                      </button>
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
              </div>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col">
                    <div className="card shadow mb-3">
                      <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold">User Settings</p>
                      </div>
                      <div className="card-body">
                        <form>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="username">
                                  <strong>Username</strong>
                                </label>
                                <input
                                  className="form-control shodow-0"
                                  type="text"
                                  id="username"
                                  placeholder="user.name"
                                  value={user.email}
                                  name="username"
                                />
                              </div>
                            </div>
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="email">
                                  <strong>Email Address</strong>
                                </label>
                                <input
                                  className="form-control"
                                  type="email"
                                  id="email"
                                  placeholder="user@example.com"
                                  name="email"
                                  value={user.email}
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
                                <input
                                  className="form-control"
                                  type="text"
                                  id="first_name"
                                  placeholder="John"
                                  name="first_name"
                                  value={user.name}
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
                                  placeholder="Collage"
                                  name="college"
                                  value={user.college}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mb-3">
                            <button
                              className="btn btn-primary btn-sm"
                              type="submit"
                            >
                              Save Settings
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="card shadow">
                      <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold">Contact Settings</p>
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
                              id="address"
                              placeholder="Thane,MH"
                              name="address"
                            />
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="city">
                                  <strong>City</strong>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="city"
                                  placeholder="Bhiwandi"
                                  name="city"
                                />
                              </div>
                            </div>
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="country">
                                  <strong>Country</strong>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="country"
                                  placeholder="INDIA"
                                  name="country"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mb-3">
                            <button
                              className="btn btn-primary btn-sm"
                              type="submit"
                            >
                              Save Settings
                            </button>
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
