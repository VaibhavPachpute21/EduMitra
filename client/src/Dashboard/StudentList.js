import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUsersByCollage } from '../actions/userActions'

const StudentList = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userLoginReducer)
  const { currentUser } = userData;
  const collageusList = useSelector(state => state.getUsersByCollageReducer);
  const { loading, allColleagues } = collageusList;

  useEffect(() => {
    dispatch(getUsersByCollage(currentUser.user.college))
    console.log(allColleagues);
  }, [dispatch])


  return (
    <div>
      <section>
        <div className="container py-4 py-xl-5">
          <div className="text-center text-white-50 bg-primary border rounded border-0 p-3">
            <div className="row row-cols-2 row-cols-md-4">
              <div className="col">
                <div className="p-3">
                  <h4 className="display-5 fw-bold text-white mb-0">123+</h4>
                  <p className="mb-0">Profile Views</p>
                </div>
              </div>
              <div className="col">
                <div className="p-3">
                  <h4 className="display-5 fw-bold text-white mb-0">5</h4>
                  <p className="mb-0">Project Uploads</p>
                </div>
              </div>
              <div className="col">
                <div className="p-3">
                  <h4 className="display-5 fw-bold text-white mb-0">67+</h4>
                  <p className="mb-0">Total Likes</p>
                </div>
              </div>
              <div className="col">
                <div className="p-3">
                  <h4 className="display-5 fw-bold text-white mb-0">89</h4>
                  <p className="mb-0">Your Rank</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-4 py-xl-5">
          <div className="row mb-5" style={{ background: 'var(--bs-body-bg)', padding: '12px', boxShadow: '0px 4px 6px 1px rgba(43,49,54,0.35)', borderRadius: '5px' }}>
            <div className="col-sm-10 col-md-7 col-lg-8">
              <h2>Connect with Others</h2>
            </div>
          </div>
          <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
            {allColleagues && allColleagues.map((collague) => {
              if (collague._id != currentUser.user._id) {
                return <>
                  <div className="col-xxl-3 text-center">
                    <Link to={`/Dashboard/Chats/${collague._id}`} className="text-decoration-none text-black">
                      <div style={{ borderRadius: '5px', padding: '5px', background: 'var(--bs-body-bg)', boxShadow: '0px 0px 5px 2px var(--bs-dark-border-subtle)' }}>
                        <img className="rounded-circle img-fluid d-block m-auto" style={{ height: '250px' }} src={collague.profilePic} alt="Project" />
                        <div className="py-3">
                          <h4><span style={{ color: 'rgb(0, 0, 0)' }}>{collague.name}</span></h4>
                          <p><span style={{ color: 'rgb(0, 0, 0)' }}>{collague.role == 0 ? "Student" : "Teacher"} at {collague.college}</span></p>
                          <p><span style={{ color: 'rgb(0, 0, 0)' }}>{collague.email} | {collague.phone}</span></p>
                          <p className='d-flex justify-content-between'><button className='btn btn-outline-primary border-0'>Connect</button> <button className='btn btn-outline-danger border-0'><i class="bi bi-heart"></i></button></p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </>
              }
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default StudentList