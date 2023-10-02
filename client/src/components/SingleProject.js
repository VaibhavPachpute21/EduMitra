import React from 'react';

const SingleProject = () => {
  return (
    <div>
      <section className="py-4 py-xl-5" style={{backgroundColor:'#f8f8f8'}}>
        <div className="container h-100" style={{ background: '#fff', paddingTop: '15px', paddingBottom: '15px' }}>
          <div className="row h-100">
            <div className="col-md-10 col-lg-10 col-xl-8 text-center d-flex d-sm-flex d-md-flex justify-content-center align-items-center mx-auto justify-content-md-start align-items-md-center justify-content-xl-center">
              <div>
                <h2 className="text-uppercase fw-bold mb-3">empath.ly</h2>
                <p className="mb-4">
                  empath.ly uses machine learning to analyze emotions during video calls or metaverse activities. We empower employers, marketers, developers, and the visually impaired to empathize remotely.
                </p>
                <div className="carousel slide carousel-dark" data-bs-ride="false" data-bs-touch="false" id="carousel-1">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img className="w-100 d-block" src="https://cdn.bootstrapstudio.io/placeholders/1400x800.png" alt="Slide Image" />
                      <p>Caption 1</p>
                    </div>
                    <div className="carousel-item">
                      <img className="w-100 d-block" src="https://cdn.bootstrapstudio.io/placeholders/1400x800.png" alt="Slide Image" />
                      <p>Caption 2</p>
                    </div>
                    <div className="carousel-item">
                      <img className="w-100 d-block" src="https://cdn.bootstrapstudio.io/placeholders/1400x800.png" alt="Slide Image" />
                      <p>Caption 3</p>
                    </div>
                  </div>
                  <div>
                    <button className="carousel-control-prev" href="#carousel-1" role="button" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" href="#carousel-1" role="button" data-bs-slide="next">
                      <span className="carousel-control-next-icon"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                  <div className="carousel-indicators" style={{ padding: '10px' }}>
                    <button type="button" data-bs-target="#carousel-1" data-bs-slide-to="0" className="active"></button>
                    <button type="button" data-bs-target="#carousel-1" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#carousel-1" data-bs-slide-to="2"></button>
                  </div>
                </div>
                <h1 className="text-start">Abstract</h1>
                <p className="text-start">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <h1 className="text-start">Challenges Faced</h1>
                <p className="text-start">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <h1 className="text-start">Explain Real-life Usage</h1>
                <p className="text-start">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <h1 className="text-start">Future Developments</h1>
                <p className="text-start">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <h1 className="text-start">Source Code</h1>
                <p className="text-start">
                  <i className="fab fa-github"></i>
                  <a className="text-start text-decoration-none text-black" href="#">
                    View Source Code
                  </a>
                  <br />
                  <i className="fab fa-youtube"></i>&nbsp;
                  <a className="text-decoration-none text-black" href="#">
                    View Demo
                  </a>
                </p>
                <div>
                  <h1 className="text-start">Created By</h1>
                  <div className="row gy-4 row-cols-2 row-cols-md-4 d-xl-flex justify-content-xl-center" style={{ marginTop: '0px' }}>
                    <div className="col" style={{ marginTop: '0px' }}>
                      <div className="card border-0 shadow-none">
                        <div className="card-body text-center d-flex flex-column align-items-center p-0">
                          <img className="rounded-circle mb-3 fit-cover" width="130" height="130" src="https://img.freepik.com/premium-vector/man-character_665280-46969.jpg?size=626&amp;ext=jpg" alt="User 1" />
                          <h5 className="fw-bold text-primary card-title mb-0"><strong>John Smith</strong></h5>
                          <p className="text-muted card-text mb-2">Erat netus</p>
                        </div>
                      </div>
                    </div>
                    <div className="col" style={{ marginTop: '0px' }}>
                      <div className="card border-0 shadow-none">
                        <div className="card-body text-center d-flex flex-column align-items-center p-0">
                          <img className="rounded-circle mb-3 fit-cover" width="130" height="130" src="https://img.freepik.com/premium-vector/man-character_665280-46969.jpg?size=626&amp;ext=jpg" alt="User 1" />
                          <h5 className="fw-bold text-primary card-title mb-0"><strong>John Smith</strong></h5>
                          <p className="text-muted card-text mb-2">Erat netus</p>
                        </div>
                      </div>
                    </div>
                    <div className="col" style={{ marginTop: '0px' }}>
                      <div className="card border-0 shadow-none">
                        <div className="card-body text-center d-flex flex-column align-items-center p-0">
                          <img className="rounded-circle mb-3 fit-cover" width="130" height="130" src="https://img.freepik.com/premium-vector/man-character_665280-46969.jpg?size=626&amp;ext=jpg" alt="User 1" />
                          <h5 className="fw-bold text-primary card-title mb-0"><strong>John Smith</strong></h5>
                          <p className="text-muted card-text mb-2">Erat netus</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleProject;
