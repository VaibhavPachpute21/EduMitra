import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../actions/userActions'

function Sidebar() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userLoginReducer)
  const { currentUser } = userData;
  const location = useLocation();

  return (
    <div className="bg-body shadow d-flex flex-column flex-shrink-0 position-fixed top-0 bottom-0" style={{ width: '4.5rem' }}>
      <Link className="text-center link-body-emphasis d-block p-3 text-decoration-none border-bottom" to="/" title="EduMitra" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-bootstrap-fill" style={{ fontSize: '25px' }}>
          <path d="M6.375 7.125V4.658h1.78c.973 0 1.542.457 1.542 1.237 0 .802-.604 1.23-1.764 1.23H6.375zm0 3.762h1.898c1.184 0 1.81-.48 1.81-1.377 0-.885-.65-1.348-1.886-1.348H6.375v2.725z"></path>
          <path d="M4.002 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4h-8zm1.06 12V3.545h3.399c1.587 0 2.543.809 2.543 2.11 0 .884-.65 1.675-1.483 1.816v.1c1.143.117 1.904.931 1.904 2.033 0 1.488-1.084 2.396-2.888 2.396H5.062z"></path>
        </svg> */}
        <span class="bs-icon-sm bs-icon-rounded bg-terracotta d-flex justify-content-center align-items-center me-2 bs-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="#fff" viewBox="0 0 16 16" class="bi bi-bezier">
          <path fill-rule="evenodd" d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5v-1zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"></path>
          <path d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5v-1zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z"></path>
        </svg></span>
        <span className="visually-hidden">Icon-only</span>
      </Link>

      <ul className="nav nav-pills flex-column text-center nav-flush mb-auto">
        <li className="nav-item">
          <Link className={`nav-link py-3 border-bottom rounded-0 ${location.pathname == "/Dashboard" ? 'bg-terracotta text-white' : ''}`} to={"/Dashboard"} aria-current="page" title="Dashboard">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-house-door" data-bs-toggle="tooltip" title="Dashboard">
              <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"></path>
            </svg>
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link py-3 border-bottom rounded-0 ${location.pathname == "/Dashboard/AddNewJobPosting" || location.pathname == "/Dashboard/AddNewProject" || location.pathname == "/Dashboard/AddNewEvent" ? 'bg-terracotta text-white' : ''}`} to={currentUser.user.role == '0' ? "/Dashboard/AddNewProject" :currentUser.user.role == '1' ? "/Dashboard/AddNewEvent":"/Dashboard/AddNewJobPosting"} title={currentUser.user.role == '0'?'Add New Project':'Add New Event'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-plus-square-dotted" data-bs-toggle="tooltip" title="Add New Project">
              <path d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834-1v1h.916v-1h-.916zm1.833 1h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"></path>
            </svg>
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link py-3 border-bottom rounded-0 ${location.pathname == "/Dashboard/Peers" ? 'bg-terracotta text-white' : ''}`} to={'/Dashboard/Peers'} title="Connect">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-people" data-bs-toggle="tooltip" title="Connect">
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"></path>
            </svg>
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link py-3 border-bottom rounded-0 ${location.pathname == "/Dashboard/PostedJobs/" ? 'bg-terracotta text-white' : ''}`} to={'/Dashboard/PostedJobs/'}>
            <i xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-briefcase" data-bs-toggle="tooltip" title="Jobs">
              </i>
          </Link>
        </li>
      </ul>

      <div className="dropdown p-3 border-top">
        <a className="dropdown-toggle link-body-emphasis d-flex align-items-center text-decoration-none" aria-expanded="false" data-bs-toggle="dropdown" role="button">
          <img className="rounded-circle" alt="" width="32" height="32" src={currentUser ? `${currentUser.user.profilePic}` : "https://cdn.bootstrapstudio.io/placeholders/1400x800.png"} style={{ objectFit: 'cover' }} />
        </a>
        <div className="dropdown-menu shadow text-small" data-popper-placement="top-start">
          {/* <Link className="dropdown-item" href="#">New project...</Link> */}
          <Link className="dropdown-item" to={`/Dashboard/Profile/${currentUser.user._id}`}>Settings</Link>
          <Link className="dropdown-item" to={`/Dashboard/Profile/${currentUser.user._id}`}>Profile</Link>
          <div className="dropdown-divider"></div>
          <button className="dropdown-item" onClick={() => { dispatch(logoutUser) }}>Sign out</button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
