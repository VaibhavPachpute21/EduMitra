import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProject, addGradesToProject } from '../../actions/projectActions'
import { toast } from 'react-toastify';


const GradeProjectPage = () => {
  const { projectID } = useParams();
  const dispatch = useDispatch()
  const projectsData = useSelector((state) => state.projectReducer);
  const { loading, singleProject, error } = projectsData;
  const userData = useSelector(state => state.userLoginReducer)
  const { currentUser } = userData;
  const [gradeData,setGradeData]=useState({
    CQ:1,
    EC:1,
    PC:1
  })

  const handleGradeChange=(e)=>{
    const { name, value } = e.target;
    setGradeData({
      ...gradeData,
      [name]: value,
    })

  }

  const getProperDate = (date) => {
    const inputDate = new Date(date);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    const formattedDateTime = inputDate.toLocaleDateString('en-US', options);

    return formattedDateTime;
  };


  useEffect(() => {
    dispatch(getSingleProject(projectID))
    console.log(projectID)
    console.log(singleProject)
  }, [dispatch])

  return (
    <div>
      {singleProject && <section className="py-4 py-xl-5" style={{ backgroundColor: '#f8f8f8' }}>
        <div className="container h-100" style={{ background: '#fff', paddingTop: '15px', paddingBottom: '15px' }}>
          <div className="row h-100">
            <div className="col-md-10 col-lg-10 col-xl-8 text-center d-flex d-sm-flex d-md-flex justify-content-center align-items-center mx-auto justify-content-md-start align-items-md-center justify-content-xl-center">
              <div>
                <h2 className="text-uppercase fw-bold mb-3">{singleProject.pTitle}</h2>
                <p className="mb-4">{singleProject.shortDescription}</p>
                <div className="carousel slide carousel-dark" data-bs-ride="false" data-bs-touch="false" id="carousel-1" style={{ height: '500px', width: '700px' }}>
                  <div className="carousel-inner" style={{ width: '100%', height: '100%' }}>
                    {singleProject.projectImages.map((image, index) => (
                      <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index} style={{ width: '100%', height: '100%', objectFit: 'contain', alignItems: 'center', }}>
                        <img className="m-auto" src={image} alt={`Project Image ${index + 1}`} height={'100%'} />
                        <p>Caption {index + 1}</p>
                      </div>
                    ))}
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
                    {singleProject.projectImages.map((image, index) => (
                      <button
                        type="button"
                        data-bs-target="#carousel-1"
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : ''}
                        key={index}
                      ></button>
                    ))}
                  </div>
                </div>
                <h1 className="text-start">Abstract</h1>
                <p className="text-start">{singleProject.longDescription}</p>
                <h1 className="text-start">Why We choose this Project</h1>
                <p className="text-start">{singleProject.whyChooseProject}</p>
                <h1 className="text-start">How it will make diffrence</h1>
                <p className="text-start">{singleProject.howDiffProject}</p>
                <h1 className="text-start">Challenges Faced</h1>
                <p className="text-start">{singleProject.difficultiesFaced}</p>
                <h1 className="text-start">Future Developments</h1>
                <p className="text-start">{singleProject.futureEnhancement}</p>
                <h1 className="text-start">This is Build With</h1>
                <p className="text-start">{singleProject.builtWith.split(',').map((item, index) => (
                  <span className="m-1 badge text-bg-primary" key={index}>{item}</span>
                ))}</p>
                <h1 className="text-start">Source Code</h1>
                <p className="text-start">
                  <i className="fab fa-github"></i>
                  <a className="text-start text-decoration-none text-black" href="#">View Source Code</a>
                  <br />
                  <i className="fab fa-youtube"></i>&nbsp;
                  <a className="text-decoration-none text-black" href="#">View Demo</a>
                </p>
                <div>
                  <h1 className="text-start">Submitted By</h1>
                  <div className="text-start" style={{ marginTop: '0px' }}>
                    <h5 className="fw-bold text-primary card-title mb-0"><strong>{singleProject.creatorInfo.name}</strong></h5>
                    <p className="text-muted card-text mb-2">{singleProject.creatorInfo.college}</p>
                  </div>
                </div>
                {singleProject.comments.map((comment) => {
                  const date = getProperDate(new Date(comment.date));
                  return (
                    <div className='text-start p-1 m-1 bg-light border border-secondary-subtle rounded-2' key={comment._id}>
                      <div className='container'>
                        <p className='p-0 mb-0'><strong>{comment.name}</strong></p>
                        <p className='p-0 mb-0 ps-2'>{comment.text}</p>
                        <p className='p-0 mb-0 ps-2'>{date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div style={{
            position: 'fixed', float: 'right', top: '80px', right: 10,
          }}>
            <div class="card" style={{ width: '18rem', }}>
              <div class="card-body">
                <h5 class="card-title">Grade {singleProject.pTitle}</h5>
                <p class="card-text mb-0">Project Content and Quality</p>
                <div><input type="range" name="CQ" id="CQ" min="1" max="10" step="1" value={gradeData.CQ} onChange={handleGradeChange}/> {gradeData.CQ}</div>
                <p class="card-text mb-0">Project Execution and Creativity</p>
                <div><input type="range" name="EC" id="EC" min="1" max="10" step="1" value={gradeData.EC} onChange={handleGradeChange}/> {gradeData.EC}</div>
                <p class="card-text mb-0">Presentation and Communication</p>
                <div> <input type="range" name="PC" id="PC" min="1" max="10" step="1" value={gradeData.PC} onChange={handleGradeChange}/> {gradeData.PC}</div>
                <button href="#" class="btn btn-primary mt-2 rounded-0" onClick={()=>{dispatch(addGradesToProject(projectID,gradeData,currentUser.token))}}>Add Grade</button>
              </div>
            </div>
          </div>
        </div>
      </section>}
    </div >
  );
};

export default GradeProjectPage;
