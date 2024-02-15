import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from '../actions/userActions';
import { getUserProjects, getProjectsByUserId } from '../actions/projectActions'
import { useParams } from 'react-router-dom';

const UserInfo = () => {
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
        <section className='profile'>
          <div className="container">
            <h3 className="text-dark mb-4">Profile</h3>
            <div className="row mb-3">
              <div className="col-lg-4">
                <div className="card mb-3 border-0">
                  <div className="card-body text-center rounded-2">
                    <img
                      className="rounded-circle mb-3 mt-4"
                      src={user.profilePic}
                      width="160"
                      height="160"
                      alt="Profile"
                    />
                  </div>
                </div>

                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h6 className="heading3 text-white m-0">Skills</h6>
                  </div>
                  <div className="card-body">
                    <p className="text-start mb-0">{user.skills && user.skills.map((item, index) => (
                      <span className="m-1 badge textStyle2" style={{ backgroundColor: 'var(--TERRACOTTA)' }} key={index}>{item.label}</span>
                    ))}</p>
                  </div>
                </div>

                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h6 className="heading3 text-white m-0">Social accounts</h6>
                  </div>
                  <div className="card-body">
                    <div class="input-group mb-3">
                      <span class="input-group-text"><i class="bi bi-github"></i></span>
                      <input type="text" class="form-control" placeholder="Github profile" aria-label="github" id="github"
                        disabled={true} value={user.github} name="github" />
                    </div>
                    <div class="input-group mb-3">
                      <span class="input-group-text"><i class="bi bi-linkedin"></i></span>
                      <input type="text" class="form-control" placeholder="Linkedin profile" aria-label="linkedin" id="linkedin"
                        disabled={true} value={user.linkedin} name="linkedin" />
                    </div>
                  </div>
                </div>

              </div>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col">
                    <div className="card mb-3">
                      <div className="card-header py-3">
                        <p className="heading3 text-white m-0">User Info</p>
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
                                  placeholder="user name"
                                  value={user.email}
                                  disabled={true}
                                  name="username"
                                />
                              </div>
                            </div>
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="first_name">
                                  <strong>Name</strong>
                                </label>
                                <input
                                  className="form-control shodow-0"
                                  type="text"
                                  id="first_name"
                                  placeholder="John"
                                  name="first_name"
                                  disabled={true}
                                  value={user.name}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="gender">
                                  <strong>Gender</strong>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="gender"
                                  value={user.gender}
                                  disabled={true}
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
                                  disabled={true}
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header py-3">
                        <p className="heading3 text-white m-0">Contact Settings</p>
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
                              placeholder="Not Available"
                              name="address"
                              disabled={true}
                              value={user.city}
                            />
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
                                disabled={true}
                                value={user.email}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="phone">
                                  <strong>Phone</strong>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="phone"
                                  placeholder="1234567890"
                                  name="city"
                                  disabled={true}
                                  value={user.phone}
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
                <p className="heading3 text-white m-0">Projects Submitted</p>
              </div>
              <div className="card-body">
                <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                  {userProjects && userProjects.map((project) => {
                    return <div className="col-xxl-3">
                      <div className="text-decoration-none text-black myCard" >
                        <div>
                          <figure>
                            <img className="rounded img-fluid d-block w-100 fit-cover" style={{ height: '200px' }} src={project.projectImages[0]} alt="Project" />
                          </figure>
                          <div className='mt-3 px-2'>
                            <h4 className='heading3 text-black'>{project.pTitle}</h4>
                            <p className='mb-0 textStyle1' >{project.shortDescription}</p>
                            <p className="text-start mb-0 textStyle2">{`${project.builtWith}`.split(',').map((item, index) => (
                              <span className="m-1 badge textStyle2" style={{ backgroundColor: 'var(--TERRACOTTA)' }} key={index}>{item}</span>
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

export default UserInfo;
