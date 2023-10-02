import React from 'react';

const Register = () => {
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
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-telephone" style={{ fontSize: '22px' }}>
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"></path>
                </svg>
              </span>
              <input className="form-control shadow-none" type="tel" style={{ borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px' }} placeholder="Your Phone Number" name="phone" inputMode="tel" required minLength="10" />
            </div>
            <div className="input-group" style={{ marginTop: '4px', marginBottom: '4px', width: '90%' }}>
              <span className="input-group-text" style={{ background: 'transparent', borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-lock" style={{ fontSize: '22px' }}>
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"></path>
                </svg>
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
