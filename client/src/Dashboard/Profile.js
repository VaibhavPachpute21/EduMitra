import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProjects } from '../actions/projectActions'
import { updateUser } from '../actions/userActions'
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import '../styles/Profile.css'

const options = [
  { value: 'Database Management Systems', label: 'Database Management Systems' },
  { value: 'PHP', label: 'PHP' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'Python', label: 'Python' },
  { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
  { value: 'Cyber Security', label: 'Cyber Security' },
  { value: 'Computer Vision', label: 'Computer Vision' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'Full Stack Developer', label: 'Full Stack Developer' },
  { value: 'Web Development', label: 'Web Development' },
  { value: 'Backend Development', label: 'Backend Development' },
  { value: 'Data Analytics', label: 'Data Analytics' },
  { value: 'Blockchain', label: 'Blockchain' },
  { value: 'Natural Language Processing', label: 'Natural Language Processing' },
  { value: 'Mobile App Development', label: 'Mobile App Development' },
  { value: 'C++', label: 'C++' },
  { value: 'Cloud Computing', label: 'Cloud Computing' },
  { value: 'Ruby', label: 'Ruby' },
  { value: 'Frontend Development', label: 'Frontend Development' },
  { value: 'R', label: 'R' },
  { value: 'Data Science', label: 'Data Science' },
  { value: 'Robotics', label: 'Robotics' },
  { value: 'Java', label: 'Java' },
  { value: 'Machine Learning', label: 'Machine Learning' },
  { value: 'Game Development', label: 'Game Development' },
  { value: 'Software Engineering', label: 'Software Engineering' }
];
var cities = [
  "Mumbai, Maharashtra",
  "Delhi, Delhi",
  "Bangalore, Karnataka",
  "Hyderabad, Telangana",
  "Ahmedabad, Gujarat",
  "Chennai, Tamil Nadu",
  "Kolkata, West Bengal",
  "Pune, Maharashtra",
  "Jaipur, Rajasthan",
  "Lucknow, Uttar Pradesh",
  "Kanpur, Uttar Pradesh",
  "Nagpur, Maharashtra",
  "Indore, Madhya Pradesh",
  "Thane, Maharashtra",
  "Bhopal, Madhya Pradesh",
  "Visakhapatnam, Andhra Pradesh",
  "Pimpri-Chinchwad, Maharashtra",
  "Patna, Bihar",
  "Vadodara, Gujarat",
  "Ghaziabad, Uttar Pradesh",
  "Ludhiana, Punjab",
  "Agra, Uttar Pradesh",
  "Nashik, Maharashtra",
  "Faridabad, Haryana",
  "Meerut, Uttar Pradesh",
  "Rajkot, Gujarat",
  "Varanasi, Uttar Pradesh",
  "Srinagar, Jammu and Kashmir",
  "Aurangabad, Maharashtra",
  "Dhanbad, Jharkhand",
  "Amritsar, Punjab",
  "Navi Mumbai, Maharashtra",
  "Allahabad, Uttar Pradesh",
  "Ranchi, Jharkhand",
  "Howrah, West Bengal",
  "Jabalpur, Madhya Pradesh",
  "Gwalior, Madhya Pradesh",
  "Vijayawada, Andhra Pradesh",
  "Jodhpur, Rajasthan",
  "Raipur, Chhattisgarh",
  "Kota, Rajasthan",
  "Guwahati, Assam",
  "Chandigarh, Chandigarh",
  "Solapur, Maharashtra",
  "Hubballi-Dharwad, Karnataka",
  "Bareilly, Uttar Pradesh",
  "Moradabad, Uttar Pradesh",
  "Mysuru, Karnataka",
  "Gurgaon, Haryana",
  "Aligarh, Uttar Pradesh"
]
const collageList = ['Universal College of Engineering', 'Thakur College of Engineering', 'Collage Of Engieering Pune'];


const Profile = () => {
  const dispatch = useDispatch();
  const { userID } = useParams();
  const projectsData = useSelector((state) => state.projectReducer)
  const currentUser = useSelector(state => state.userLoginReducer.currentUser)
  const { userProjects } = projectsData;
  const { user } = currentUser;
  const [editProfile, setEdit] = useState(false);
  const [skills, setSkills] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    college: '',
    city: '',
    linkedin: '',
    github: '',
    bio: ''
  });

  const handleInputChange = (e) => {
    if (editProfile) {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    console.log(":::" + currentUser.user.name);
    initialDataLoad()
    dispatch(getUserProjects(currentUser.token));
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
      city: user.city,
      linkedin: user.linkedin,
      github: user.github,
      bio: user.bio
    });
    setSkills(user.skills)
  }

  async function handleSave() {
    setEdit(!editProfile);
    const id = currentUser.user._id;
    const userData = { ...formData, "_id": id, skills };
    dispatch(updateUser(userData, currentUser.token));

    console.log(userData);
  }

  return (
    <div>
      {user && (
        <section className='profile'>
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
                      {editProfile ? <button className="btn button2 btn-sm" type="button" onClick={handleSave}>
                        Save Changes
                      </button> : <button className="btn button2 btn-sm" type="button" onClick={() => { setEdit(!editProfile) }}>
                        Edit Profile
                      </button>}

                    </div>
                  </div>
                </div>

                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="heading3 text-white m-0">Skills</h6>
                  </div>
                  <div className="card-body">

                    <Select
                      isDisabled={!editProfile}
                      hideSelectedOptions={false}
                      isMulti
                      options={options}
                      //value={selectedOption}
                      // onChange={(e)=>{formData.skills.push(e)}}
                      onChange={setSkills}
                    //defaultValue={selectedOption}

                    />
                    <p className="text-start mb-0">{skills && skills.map((item) => (
                      <span className="m-1 badge textStyle2" style={{ backgroundColor: 'var(--TERRACOTTA)' }} >{item.label}</span>
                    ))}</p>
                  </div>
                </div>

                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="heading3 text-white m-0">Social accounts</h6>
                  </div>
                  <div className="card-body">
                    <div class="input-group mb-3">
                      <span class="input-group-text"><i class="bi bi-github"></i></span>
                      <input type="text" class="form-control" placeholder="Github profile" aria-label="github" id="github"
                        disabled={!editProfile} value={formData.github} onChange={handleInputChange} name="github" />
                    </div>
                    <div class="input-group mb-3">
                      <span class="input-group-text"><i class="bi bi-linkedin"></i></span>
                      <input type="text" class="form-control" placeholder="Linkedin profile" aria-label="linkedin" id="linkedin"
                        disabled={!editProfile} value={formData.linkedin} onChange={handleInputChange} name="linkedin" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col">
                    <div className="card shadow mb-3">
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
                                <input className="form-control shodow-0"
                                  type="text" id="username" placeholder="user.name"
                                  value={user.email} disabled={true} name="username"
                                />
                              </div>
                            </div>
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="first_name">
                                  <strong>Name</strong>
                                </label>
                                <input className="form-control"
                                  type="text" id="name"
                                  placeholder="Your name" name="name"
                                  disabled={!editProfile}
                                  value={formData.name} onChange={handleInputChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="first_name">
                                  <strong>Gender</strong>
                                </label>
                                <select
                                  className="form-select shadow-none"
                                  name="gender"
                                  disabled={!editProfile}
                                  value={formData.gender}
                                  onChange={handleInputChange}
                                >
                                  <option>--Select Gender--</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </select>
                              </div>
                            </div>
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="college">
                                  <strong>Collage</strong>
                                </label>
                                <select id='college' className="form-select shadow-none"
                                  disabled={!editProfile}
                                  name="college" value={formData.college}
                                  onChange={handleInputChange}>
                                  <option>--Select College--</option>
                                  {collageList.map((clg) => (
                                    <option key={clg} value={clg}>
                                      {clg}
                                    </option>
                                  ))}
                                </select>
                                {/* <input
                                  className="form-control"
                                  type="text" id="college"
                                  placeholder="Collage Name"
                                  name="college" disabled={!editProfile}
                                  value={formData.college} onChange={handleInputChange}
                                /> */}
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
                    <div className="card shadow mb-3">
                      <div className="card-header py-3">
                        <p className="heading3 text-white m-0">Bio</p>
                      </div>
                      <div className="card-body">
                        <form>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="username">
                                  <strong>Add a bio</strong>
                                </label>
                                <input className="form-control shodow-0"
                                  disabled={!editProfile}
                                  onChange={handleInputChange}
                                  type="text" id="bio" placeholder="Add a bio"
                                  value={formData.bio} name="bio"
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
                        <p className="heading3 text-white m-0">Contact Details</p>
                      </div>
                      <div className="card-body">
                        <form>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="address">
                              <strong>Address</strong>
                            </label>
                            <select
                              className="form-select shadow-none"
                              name="city"
                              disabled={!editProfile}
                              value={formData.city}
                              onChange={handleInputChange}
                            >
                              <option>--Select City--</option>
                              {cities.map((city) => {
                                return <option value={city}>{city}</option>
                              })}
                            </select>

                            {/* <input
                              className="form-control"
                              type="text" id="city"
                              placeholder="City, State" name="city"
                              disabled={!editProfile}
                              onChange={handleInputChange}
                              value={formData.city}
                            /> */}
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="city">
                                  <strong>Phone Number</strong>
                                </label>
                                <input
                                  className="form-control"
                                  type="text" id="phone"
                                  placeholder="1234567890" name="phone"
                                  disabled={!editProfile}
                                  onChange={handleInputChange}
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
                                  onChange={handleInputChange}
                                  className="form-control"
                                  type="text" id="email"
                                  placeholder="user@example.com"
                                  name="email" disabled={!editProfile}
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

export default Profile;
