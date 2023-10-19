import React from 'react';

const Register = () => {
  const collageList = ['UCoE', 'Thakur', 'COEP']
  return (
    <div>
      <div className="container" style={{ width: '65%', margin: '0px auto', padding: '25px', background: 'white', marginTop: '30px', borderRadius: '15px', boxShadow: '0px 0px 10px 6px var(--bs-dark-border-subtle)' }}>
        <div className="row">
          <div className="col-md-6 col-xxl-5 align-self-center">
            <h1 className="text-center">Join EduMitra</h1>
            <div className="input-group" style={{ marginTop: '4px', marginBottom: '4px', width: '90%' }}>
              <span className="input-group-text" style={{ background: 'transparent', borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px' }}>
                <i className="far fa-user" style={{ fontSize: '22px' }}></i>
              </span>
              <input className="form-control shadow-none" type="text" style={{ borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px' }} placeholder="Your Name" minLength="3" required maxLength="289" name="name" />
            </div>
            <div className="input-group" style={{ marginTop: '4px', marginBottom: '4px', width: '90%' }}>
              <span className="input-group-text" style={{ background: 'transparent', borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px' }}>
                <i className="far fa-envelope" style={{ fontSize: '22px' }}></i>
              </span>
              <input className="form-control shadow-none" type="email" style={{ borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px' }} placeholder="Your Email" name="email" inputMode="email" required />
            </div>
            <div className="input-group" style={{ marginTop: '4px', marginBottom: '4px', width: '90%' }}>
              <span className="input-group-text" style={{ background: 'transparent', borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px' }}>
                <i className="bi bi-telephone" style={{ fontSize: '22px' }}></i>
              </span>
              <input className="form-control shadow-none" type="tel" style={{ borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px' }} placeholder="Your Phone Number" name="phone" inputMode="tel" required minLength="10" />
            </div>
            <div className="input-group">
              <span className="input-group-text" style={{ background: 'transparent', borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px' }}>
                <i className="bi bi-gender-ambiguous" style={{ fontSize: '22px' }}></i>
              </span>
              <select className="form-select shadow-none" required style={{ borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px' }}>
                <option>--Select Gender--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="input-group">
              <span className="input-group-text" style={{ background: 'transparent', borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px' }}>
                <i className="bi bi-people" style={{ fontSize: '22px' }}></i>
              </span>
              <select className="form-select shadow-none" required style={{ borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px' }}>
                <option>--Select Role--</option>
                <option value="0">Student</option>
                <option value="1">Teacher</option>
                <option value="2">University</option>
              </select>
            </div>
            <div className="input-group">
              <span className="input-group-text" style={{ background: 'transparent', borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px' }}>
                <i className="far fa-building" style={{ fontSize: '22px' }}></i>
              </span>
              <select className="form-select shadow-none" required style={{ borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px' }}>
                <option>--Select Collage--</option>
                  {collageList.map((clg) => {
                    return <option value={clg}>{clg}</option>
                  })}
                
              </select>
            </div>
            <div className="input-group" style={{ marginTop: '4px', marginBottom: '4px', width: '90%' }}>
              <span className="input-group-text" style={{ background: 'transparent', borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px' }}>
                <i className="bi bi-lock" style={{ fontSize: '22px' }}></i>
              </span>
              <input className="form-control shadow-none" type="password" style={{ borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px' }} placeholder="Set Password" name="password" required minLength="6" />
            </div>
            <button className="btn btn-primary fs-6" type="button" style={{ marginTop: '25px', borderRadius: '3px' }}>Register Now</button>
          </div>
          <div className="col-md-6 col-xxl-6 order-first order-md-last" style={{ minHeight: '250px' }}>
            <img className="w-100 fit-cover" src="assets/img/signup-image.jpg" width="431" height="460" style={{ height: 'min-content' }} alt="Register" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
