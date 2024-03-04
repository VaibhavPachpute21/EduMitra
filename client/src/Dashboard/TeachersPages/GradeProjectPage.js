import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProject, addGradesToProject } from '../../actions/projectActions'
import { getUserId } from '../../actions/userActions';
import emailjs from 'emailjs-com'
import Loading from '../../components/Common/Loading'
import axios from 'axios';


const GradeProjectPage = () => {
  const { projectID } = useParams();
  const dispatch = useDispatch()
  const projectsData = useSelector((state) => state.projectReducer);
  const { singleProject, error } = projectsData;
  const userData = useSelector(state => state.userLoginReducer)
  const { currentUser } = userData;
  const creatorData = useSelector((state) => state.getUsersByIDReducer)
  const { user, loading } = creatorData;
  const [isLoading, setIsLoading] = useState(true);
  const [gradeData, setGradeData] = useState({
    CQ: 1,
    EC: 1,
    PC: 1
  })
  const [pres, setPRes] = useState(null)

  const checkPlagiarism=async ()=>{
    setIsLoading(true)
    console.log(process.env.REACT_APP_PLAGIARISM)
    const res=await axios.post(`${process.env.REACT_APP_SERVER}/api/project/checkSentence`,{
      query:singleProject.shortDescription
    });
    setPRes(res.data)
    setIsLoading(false)
  }

  const handleGradeChange = (e) => {
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

  const handleSubmit = async () => {
    setIsLoading(true)
    await dispatch(getUserId(singleProject.creator))
    dispatch(addGradesToProject(projectID, gradeData, currentUser.token));
    sendNotification({ "name": singleProject.creatorInfo.name, "email": user.email, "pTitle": singleProject.pTitle })
    setIsLoading(false)

  }

  const sendNotification = async (mailData) => {
    try {
      console.log(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, process.env.REACT_APP_PUBLIC_KEY)
      await emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, {
        from_name: "EduMitra",
        to_name: mailData.name,
        from_email: "EduMitra.in",
        to_email: mailData.email,
        message: `Your project ${mailData.pTitle} just has been graded! Please login in to you dashboad to check more details. 
Title: ${mailData.pTitle} 
Description: ${singleProject.shortDescription}`,
        subject: "EduMitra Project Updates!!"
      }, process.env.REACT_APP_PUBLIC_KEY);
    } catch (error) {
    }
  }

  const startUp = async () => {
    setIsLoading(true)
    await dispatch(getSingleProject(projectID))
    setIsLoading(false)
  };

  useEffect(() => {
    if (singleProject) {
      dispatch(getUserId(singleProject.creator))
    }
  }, [singleProject])
  useEffect(() => {
    startUp();
  }, [projectID]);

  return (
    <div>
      {isLoading ? (
        <section className="py-4 py-xl-5 singleProject">
          <div className="container h-100">
            <Loading />
          </div>
        </section>) : singleProject ? <section className="py-4 py-xl-5 singleProject">
          <div className="container h-100">
            <div className="row h-100">
              <div className="col-md-10 col-lg-10 col-xl-8 text-center d-flex d-sm-flex d-md-flex justify-content-center align-items-center mx-auto justify-content-md-start align-items-md-center justify-content-xl-center">
                <div>
                  <h2 className="text-uppercase heading2 mb-3">{singleProject.pTitle}</h2>
                  <p className="mb-4 textStyle3 fw-bold text-black" dangerouslySetInnerHTML={{ __html: singleProject.shortDescription }}></p>
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
                  <hr />
                  <h1 className="text-start textStyle2 text-black fw-bold fs-4 mb-1">Abstract</h1>
                  <p className="text-start textStyle2 text-black mb-3" dangerouslySetInnerHTML={{ __html: singleProject.longDescription }}></p>
                  <h1 className="text-start textStyle2 text-black fw-bold fs-4 mb-1">Why We choose this Project</h1>
                  <p className="text-start textStyle2 text-black mb-3" dangerouslySetInnerHTML={{ __html: singleProject.whyChooseProject }}></p>
                  <h1 className="text-start textStyle2 text-black fw-bold fs-4 mb-1">How it will make diffrence</h1>
                  <p className="text-start textStyle2 text-black mb-3" dangerouslySetInnerHTML={{ __html: singleProject.howDiffProject }}></p>
                  <h1 className="text-start textStyle2 text-black fw-bold fs-4 mb-1">Challenges Faced</h1>
                  <p className="text-start textStyle2 text-black mb-3" dangerouslySetInnerHTML={{ __html: singleProject.difficultiesFaced }}></p>
                  <h1 className="text-start textStyle2 text-black fw-bold fs-4 mb-1">Future Developments</h1>
                  <p className="text-start textStyle2 text-black mb-3" dangerouslySetInnerHTML={{ __html: singleProject.futureEnhancement }}></p>
                  <h1 className="text-start textStyle2 text-black fw-bold fs-4 mb-1">This is Build With</h1>
                  <p className="text-start textStyle2 text-black">{singleProject.builtWith.split(',').map((item, index) => (
                    <span className="m-1 badge textStyle2" style={{ backgroundColor: 'var(--TERRACOTTA)' }} key={index}>{item}</span>
                  ))}</p>
                  {/* {singleProject.codeLink !== null || singleProject.codeLink !== null ? <h1 className="text-start textStyle2 text-black fw-bold fs-4 mb-1">Links</h1> : ""} */}
                  {singleProject.codeLink !== null || singleProject.codeLink !== null ? <h1 className="text-start textStyle2 text-black fw-bold fs-4 mb-1">Links</h1> : ""}
                  <div className="text-start">
                    {singleProject.codeLink == null ? '' : <><i className="fab fa-github"></i>&nbsp;&nbsp;
                      <a className="text-start text-decoration-none textStyle2 text-black mb-3 text-black" target='_blank' href={singleProject.codeLink}>Source Code</a><br /></>}
                    {singleProject.demoLink == null ? '' : <>
                      <i className="fab fa-youtube"></i>&nbsp;&nbsp;
                      <a className="text-decoration-none textStyle2 text-black mb-3 text-black" target='_blank' href={singleProject.demoLink}>View Demo</a>
                    </>}
                  </div>
                  <hr />
                  <div>
                    <h1 className="text-start textStyle2 text-black fw-bold fs-4 mb-3">Submitted By</h1>
                    <div className="text-start">
                      <h5 className="heading2 text-black fs-5 mb-0"><strong>{singleProject.creatorInfo.name}</strong></h5>
                      <p className="textStyle2 text-muted card-text mb-2">{singleProject.creatorInfo.college}</p>
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
                  <div><input type="range" name="CQ" id="CQ" min="1" max="10" step="1" value={gradeData.CQ} onChange={handleGradeChange} /> {gradeData.CQ}</div>
                  <p class="card-text mb-0">Project Execution and Creativity</p>
                  <div><input type="range" name="EC" id="EC" min="1" max="10" step="1" value={gradeData.EC} onChange={handleGradeChange} /> {gradeData.EC}</div>
                  <p class="card-text mb-0">Presentation and Communication</p>
                  <div> <input type="range" name="PC" id="PC" min="1" max="10" step="1" value={gradeData.PC} onChange={handleGradeChange} /> {gradeData.PC}</div>
                  <button href="#" class="btn btn-primary mt-2 rounded-0 m-1" onClick={handleSubmit}>Add Grade</button>
                  <button href="#" class="btn btn-primary mt-2 rounded-0 m-1" onClick={checkPlagiarism}>Check Plagiarism</button>
                  <div style={{maxHeight:'150px',overflowY:'scroll'}}>
                    {pres && <><p> {pres.unique ? "This Project is Unique":"There are Projects similar to this"} </p> </>}
                    {pres && pres.webs.map((w)=>{
                        return <><details>
                        <summary>{w.title}</summary>
                        <p><a href={w.url} target='_blank'>{w.url}</a> </p>
                      </details></>
                    })}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section> : (
        // Render an error message if data is not available
        <section className="py-4 py-xl-5" style={{ backgroundColor: '#f8f8f8' }}>
          <div className="container h-100" style={{ background: '#fff', paddingTop: '15px', paddingBottom: '15px' }}>
            <div className="row h-100"><h1>Data not found</h1></div>
          </div>
        </section>
      )}
    </div>
  );
};

export default GradeProjectPage;
