import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../actions/userActions'

const Navbar = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userLoginReducer)
  const { currentUser } = userData;

  return (
    <div>
      <nav class="navbar navbar-expand-md border-bottom border-dark py-3 bg-white">
        <div class="container"><Link class="navbar-brand d-flex align-items-center" to="/"><span class="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-bezier">
          <path fill-rule="evenodd" d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5v-1zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"></path>
          <path d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5v-1zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z"></path>
        </svg></span><span>EduMitra</span></Link><button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-2"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
          <div class="collapse navbar-collapse" id="navcol-2">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item"><Link class="nav-link active" to="/Projects">Projects</Link></li>
              <li class="nav-item"><Link class="nav-link active active" to="/Events">Events</Link></li>
              {currentUser != null ? <></> : <li class="nav-item"><Link class="nav-link active active" to="/Login">Log In</Link></li>}
            </ul>
            {currentUser != null ? <div className="dropdown p-3">
              <a className="dropdown-toggle link-body-emphasis d-flex align-items-center text-decoration-none" aria-expanded="false" data-bs-toggle="dropdown" role="button">
                <img className="rounded-circle" alt="" width="32" height="32" src={currentUser ? `${currentUser.user.profilePic}` : "https://cdn.bootstrapstudio.io/placeholders/1400x800.png"} style={{ objectFit: 'cover' }} />
              </a>
              <div className="dropdown-menu shadow text-small" data-popper-placement="top-start">
                <Link className="dropdown-item" to={'/Dashboard'}>Dashboard</Link>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={() => { dispatch(logoutUser) }}>Sign out</button>
              </div>
            </div> : <Link class="btn btn-outline-primary ms-md-2 rounded-0" role="button" to="/Register">SignUp</Link>}

          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar