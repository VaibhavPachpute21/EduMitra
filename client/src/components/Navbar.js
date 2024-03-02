import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../actions/userActions'

const Navbar = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userLoginReducer)
  const { currentUser } = userData;
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLinkClick = () => {
    if (isNavOpen) {
      setIsNavOpen(false);
    }
  };

  return (
    <div>
      <nav class="navbar navbar-expand-md py-2" style={{ backgroundColor: '#F2E5D3', borderBottom: '2px solid #B0522A' }}>
        <div class="container">
          <Link class="navbar-brand d-flex align-items-center" to="/">
            <span>EduMitra</span></Link>
            <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-2" onClick={handleNavToggle}>
              <span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
          <div className={`collapse navbar-collapse ${isNavOpen ? 'show collapsing' : ''}`} id="navcol-2">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item"><Link class="nav-link active" to="/Projects" onClick={handleLinkClick} >Projects</Link></li>
              <li class="nav-item"><Link class="nav-link active active" to="/Events" onClick={handleLinkClick}>Events</Link></li>
              {currentUser != null ? <></> : <li class="nav-item"><Link class="nav-link active active" to="/Login" onClick={handleLinkClick} >Log In</Link></li>}
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
            </div> : <Link class="btn button1 ms-md-2 rounded-0" role="button" to="/Register" onClick={handleLinkClick}>SignUp</Link>}

          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar