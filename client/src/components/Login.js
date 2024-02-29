import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../actions/userActions'
import '../styles/Login.css'

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
      <div className="container login">
        <div className="row">
          <div className="col-md-6 col-xxl-6" style={{ minHeight: '250px' }}>
            <img className="w-100 fit-cover" src="assets/img/signin-image.jpg" width="431" height="460" style={{ height: 'min-content' }} alt="Login" />
          </div>
          <div className="col-md-6 col-xxl-5 align-self-center">
            <h1 className="heading2">Log In</h1>
            <div className="input-group">
              <span className="input-group-text">
                <i className="far fa-user" style={{ fontSize: '22px' }}></i>
              </span>
              <select
                className="form-select shadow-none"
                name="role" required value={formData.role}
                onChange={handleInputChange}>
                <optgroup label="Select Role">
                  <option value="0">Student</option>
                  <option value="1">Mentor</option>
                  {/* <option value="2">University</option> */}
                </optgroup>
              </select>
            </div>
            <div className="input-group" style={{ marginTop: '4px', marginBottom: '4px', }}>
              <span className="input-group-text" >
                <i className="far fa-envelope" style={{ fontSize: '22px' }}></i>
              </span>
              <input
                className="form-control shadow-none"
                type="email"
                placeholder="Your Email"
                name="email"
                inputMode="email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <span className="input-group-text" >
                <i className="fa fa-key" style={{ fontSize: '22px' }}></i>
              </span>
              <input
                className="form-control shadow-none"
                type="password"
                placeholder="Enter Password"
                name="password"
                required
                minLength="6"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <button className="btn button2" role="button" style={{ marginTop: '25px', borderRadius: '3px' }} onClick={handleSubmit}>Log In</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
