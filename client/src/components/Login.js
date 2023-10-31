import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../actions/userActions'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '0',
  });

  const dispatch = useDispatch();
  const loginUserState = useSelector((state) => state.userLoginReducer);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    dispatch(loginUser(formData));
    // setFormData({
    //   email: '',
    //   password: '',
    //   role: '0',
    // });
  };

  return (
    <div>
      <div className="container" style={{ width: '65%', margin: '0px auto', padding: '25px 50px', background: 'white', marginTop: '30px', borderRadius: '15px', boxShadow: '0px 0px 10px 6px var(--bs-dark-border-subtle)' }}>
        <div className="row">
          <div className="col-md-6 col-xxl-6" style={{ minHeight: '250px' }}>
            <img className="w-100 fit-cover" src="assets/img/signin-image.jpg" width="431" height="460" style={{ height: 'min-content' }} alt="Login" />
          </div>
          <div className="col-md-6 col-xxl-5 align-self-center">
            <h1 className="text-center">Log In</h1>
            <div className="input-group">
              <span className="input-group-text" style={{ background: 'transparent', borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px' }}>
                <i className="far fa-user" style={{ fontSize: '22px' }}></i>
              </span>
              <select
                className="form-select shadow-none"
                name="role"
                required
                style={{ borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px' }}
                value={formData.role}
                onChange={handleInputChange}
              >
                <optgroup label="Select Role">
                  <option value="0">Student</option>
                  <option value="1">Teacher</option>
                  {/* <option value="2">University</option> */}
                </optgroup>
              </select>
            </div>
            <div className="input-group" style={{ marginTop: '4px', marginBottom: '4px', width: '90%' }}>
              <span className="input-group-text" style={{ background: 'transparent', borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px' }}>
                <i className="far fa-envelope" style={{ fontSize: '22px' }}></i>
              </span>
              <input
                className="form-control shadow-none"
                type="email"
                style={{ borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px' }}
                placeholder="Your Email"
                name="email"
                inputMode="email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group" style={{ marginTop: '4px', marginBottom: '4px', width: '90%' }}>
              <span className="input-group-text" style={{ background: 'transparent', borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px' }}>
                <i className="fa fa-key" style={{ fontSize: '22px' }}></i>
              </span>
              <input
                className="form-control shadow-none"
                type="password"
                style={{ borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px' }}
                placeholder="Enter Password"
                name="password"
                required
                minLength="6"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <button className="btn btn-primary fs-6" role="button" style={{ marginTop: '25px', borderRadius: '3px' }} onClick={handleSubmit}>Log In</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
