import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleJob, applyForJOb } from '../actions/jobActions'
import Loading from '../components/Common/Loading'
import { useParams, Link } from 'react-router-dom'


const SingleJobDetail = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch()
  const userData = useSelector(state => state.userLoginReducer)
  const { currentUser } = userData;
  const jobsData = useSelector((state) => state.jobReducer);
  const { loading, singleJob, error } = jobsData;

  useEffect(() => {
    dispatch(getSingleJob(jobId))
  }, [dispatch])

  function applyNow() {
    const applicant = {
      "userId": currentUser.user._id,
      "name": currentUser.user.name,
      "email": currentUser.user.email,
      "college": currentUser.user.college,
      "profilePic": currentUser.user.profilePic,
      "city": currentUser.user.city
    }
    dispatch(applyForJOb(jobId, applicant));
  }

  return (
    <>
      {loading ? <Loading /> : singleJob && <section className="py-4 py-xl-5 singleProject">
        <div className="container h-100">
          <div className="w-100">
            <div className="col-md-10 col-lg-10 col-xl-8 text-center justify-content-center align-items-center mx-auto justify-content-md-start align-items-md-center justify-content-xl-center">
              <div>
                <h2 className="text-uppercase heading2 mb-3 fs-3">{singleJob.jobName}</h2>
                <div className="mb-4 textStyle2 fw-bold text-black ">{singleJob.companyName}</div>
                <div><i class="bi bi-geo-alt"></i> : {singleJob.location} | <i class="bi bi-envelope"></i> : {singleJob.contactEmail} </div>
                <div>Posted on : {singleJob.createdAt.split("T")[0]} | Applicants : {singleJob.applicants.length}</div>


                <h1 className="text-start textStyle2 text-black fw-bold fs-4 mb-1">Description:</h1>
                <div className="text-start textStyle2 text-black mb-3" dangerouslySetInnerHTML={{ __html: singleJob.jobDescription }}></div>

                {currentUser.user.role === 0 && <button className='btn button1 rounded-pill' onClick={() => { applyNow() }}>Apply Now </button>}
                {
                  currentUser.user._id === singleJob.postedBy && singleJob.applicants.length > 0 && <>
                    <div className='row'>
                      {singleJob.applicants.map((applicant) => {
                        return <>
                          <div className='col-4'>
                            <Link to={`/Dashboard/User/${applicant.user}`}  className="text-decoration-none text-black">
                              <div className="d-flex flex-column cardStyle1">
                                <div className="w-100">
                                  <figure>
                                    <img className="rounded  d-block w-50 m-auto" style={{
                                      height: '100px', minWidth: '100px'
                                    }} src={applicant.profilePic} alt="Project Thumbnail" />
                                  </figure>
                                </div>
                                <div className="py-4 py-lg-2 px-lg-4">
                                  <h4 className='textStyle3 text-muted text-black'>{applicant.name}</h4>
                                  <h4 className='heading3 fw-bold text-black mb-3'>{applicant.college}</h4>
                                  <p className='textStyle3 mb-1 text-black'>{applicant.city}</p>
                                  <p className='textStyle3 text-black'> {applicant.email}</p>
                                </div>
                              </div>
                            </Link>
                          </div>

                        </>
                      })}
                    </div>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      }</>
  )
}

export default SingleJobDetail