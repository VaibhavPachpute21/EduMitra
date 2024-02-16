import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProject, addComment } from '../actions/projectActions'
import { toast } from 'react-toastify';
import StarRating from '../components/Common/StarRating'
import '../styles/SingleProject.css'


const SingleProject = () => {
  const { projectID } = useParams();
  const dispatch = useDispatch()
  const projectsData = useSelector((state) => state.projectReducer);
  const { loading, singleProject, error } = projectsData;
  const userData = useSelector(state => state.userLoginReducer)
  const { currentUser } = userData;
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = () => {
    try {
      dispatch(addComment(singleProject._id, commentText, currentUser.token));
      setCommentText('');
    } catch (error) {
      toast.error(error.response ? error.response.data.message : "Failed to add Comment");
    }
  };

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
    console.log(process.env.REACT_APP_SERVER);
    
  }, [dispatch])

  return (
    <div>
      {singleProject && <section className="py-4 py-xl-5 singleProject">
        <div className="container h-100">
          <div className="w-100">
            <div className="col-md-10 col-lg-10 col-xl-8 text-center justify-content-center align-items-center mx-auto justify-content-md-start align-items-md-center justify-content-xl-center">
              <div>
                <h2 className="text-uppercase heading2 mb-3">{singleProject.pTitle}</h2>
                <div className="mb-4 textStyle3 fw-bold text-black " dangerouslySetInnerHTML={{ __html: singleProject.shortDescription }}></div>
                <div className="carousel slide carousel-dark mb-4" data-bs-ride="false" data-bs-touch="false" id="carousel-1" style={{ height: '500px', width: '100%' }}>
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
                <h1 className="text-start textStyle2 text-black fw-bold fs-4 mb-1">Abstract</h1>
                <div className="text-start textStyle2 text-black mb-3" dangerouslySetInnerHTML={{ __html: singleProject.longDescription }}></div>

                <h1 className="text-start textStyle2 text-black fw-bold fs-4 mb-1">Why We choose this Project</h1>
                <div className="text-start textStyle2 text-black mb-3" dangerouslySetInnerHTML={{ __html: singleProject.whyChooseProject }}></div>

                <h1 className="text-start textStyle2 text-black fw-bold fs-4 mb-1">How it will make diffrence</h1>
                <div className="text-start textStyle2 text-black mb-3" dangerouslySetInnerHTML={{ __html: singleProject.howDiffProject }}></div>

                <h1 className="text-start textStyle2 text-black fw-bold fs-4 mb-1">Challenges Faced</h1>
                <div className="text-start textStyle2 text-black mb-3" dangerouslySetInnerHTML={{ __html: singleProject.difficultiesFaced }}></div>

                <h1 className="text-start textStyle2 text-black fw-bold fs-4 mb-1">Future Developments</h1>
                <div className="text-start textStyle2 text-black mb-3" dangerouslySetInnerHTML={{ __html: singleProject.futureEnhancement }}></div>

                <h1 className="text-start textStyle2 text-black fw-bold fs-4 mb-1">This is Build With</h1>
                <p className="text-start textStyle2 text-black">{singleProject.builtWith.split(',').map((item, index) => (
                  <span className="m-1 badge textStyle2" style={{ backgroundColor: 'var(--TERRACOTTA)' }} key={index}>{item}</span>
                ))}</p>

                {singleProject.codeLink !== null || singleProject.codeLink !== null ? <h1 className="text-start textStyle2 text-black fw-bold fs-4 mb-1">Links</h1> : ""}
                <div className="text-start">
                  {singleProject.codeLink == null || singleProject.codeLink=='' ? '' : <><i className="fab fa-github"></i>&nbsp;&nbsp;
                    <a className="text-start text-decoration-none textStyle2 text-black mb-3 text-black" target='_blank' href={singleProject.codeLink}>Source Code</a><br /></>}
                  {singleProject.demoLink == null || singleProject.demoLink=='' ? '' : <>
                    <i className="fab fa-youtube"></i>&nbsp;&nbsp;
                    <a className="text-decoration-none textStyle2 text-black mb-3 text-black" target='_blank' href={singleProject.demoLink}>View Demo</a>
                  </>}
                </div>
                <hr />
                <div>
                  <h1 className="text-start textStyle2 text-black fw-bold fs-4 mb-3">Created By</h1>
                  <div className="row gy-4 row-cols-2 row-cols-md-4 d-xl-flex justify-content-xl-center" style={{ marginTop: '0px' }}>
                    <div className="col p-2 rounded-5" style={{ marginTop: '0px', backgroundColor: 'var(--MARMALADE)' }}>
                      <div className="border-0 shadow-none">
                        <div className=" text-center d-flex flex-column align-items-center p-0">
                          <img className="rounded-circle mb-3 fit-cover rounded-circle" width="130" height="130" src={singleProject.creatorInfo.profilePic} alt="Image" />
                          <h5 className="heading2 text-black fs-4 mb-0"><strong>{singleProject.creatorInfo.name}</strong></h5>
                          <p className="textStyle2 text-muted card-text mb-2">{singleProject.creatorInfo.college}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='input-group mt-3 mb-3'>
                  <input className='form-control' type="text" placeholder="Add a comment..."
                    value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                  <button className='btn button1' onClick={handleCommentSubmit}>Submit Comment</button>
                </div>

                {singleProject.comments.map((comment) => {
                  const date = getProperDate(new Date(comment.date));
                  return (
                    <div className='text-start' key={comment._id}>
                      <hr />
                      <div className='container pt-0'>
                        <p className='p-0 mb-0 textStyle2 text-black'><strong>{comment.name}</strong></p>
                        <p className='p-0 mb-0 ps-2 textStyle3 text-black'>{comment.text}</p>
                        <p className='p-0 mb-0 ps-2 textStyle2 text-black fw-bold'>{date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {singleProject.grades.CQ && singleProject.grades.CQ && singleProject.grades.CQ != null ? <div style={{
            position: 'fixed', float: 'right', top: '120px', right: 10,
          }}>
            <div class="card" style={{ width: '18rem', }}>
              <div class="card-body">
                <h5 class="card-title">{singleProject.pTitle} Grades</h5>
                <p class="card-text mb-0">Project Content and Quality</p>
                <StarRating grade={singleProject.grades.CQ} />
                <p class="card-text mb-0">Project Execution and Creativity</p>
                <StarRating grade={singleProject.grades.EC} />
                <p class="card-text mb-0">Presentation and Communication</p>
                <StarRating grade={singleProject.grades.PC} />
              </div>
            </div>
          </div> : ""}
        </div>
      </section>}
    </div >
  );
};

export default SingleProject;
