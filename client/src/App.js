import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import SingleProject from './components/SingleProject';
import Login from './components/Login';
import Register from './components/Register';
import ProjectList from './components/ProjectsPage';
import Profile from './Dashboard/Profile'
import Sidebar from './components/Sidebar';
import AddNewProject from './Dashboard/StudentsPages/AddNewProject';
import AddNewEvents from './Dashboard/TeachersPages/AddNewEvents';
import StudentList from './Dashboard/StudentList';
import Dashoboard from './Dashboard/Dashoboard';
import GradeProjectPage from './Dashboard/TeachersPages/GradeProjectPage';
import EventList from './components/EventsPage';
import Messaging from './Dashboard/Messaging';
import UserInfo from './Dashboard/UserInfo';
import ChatBot from './components/ChatBot';
import { useDispatch, useSelector } from 'react-redux'
import PostJob from './Dashboard/ProfessionalPages/PostJob';
import AllUsersList from './Dashboard/AllUsersList';

function App() {
  const location = useLocation();
  const userData = useSelector(state => state.userLoginReducer)
  const { currentUser } = userData;
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    initialfunct();
  }, [location.pathname]);

  function initialfunct() {
    if (currentUser !== null) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }

  }
  return (
    <>
      {location.pathname.startsWith('/Dashboard') ? (
        currentUser ? (
          <>
            <div className='row'>
              <div style={{ width: '4.5rem' }}>
                <Sidebar />
              </div>
              <div style={{ marginLeft: '0.4rem' }}>
                <Outlet />
              </div>
            </div>
          </>
        ) : (
          window.location.href='/'
        )
      ) : (
        <Navbar />
      )}

      <ToastContainer position='top-center' />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Projects' element={<ProjectList />} />
        <Route path='/Events' element={<EventList />} />
        <Route path='/Project/:projectID' element={<SingleProject />} />
        {/* <Route path='/Dashboard' element={
          <>
            <div className='row'>
              <div style={{ width: '4.5rem' }}><Sidebar /></div>
              <div style={{ marginLeft: '0.4rem' }}><Outlet /></div>
            </div>
          </>
        }>
          <Route path='/Dashboard' element={<Dashoboard />} />
          <Route path='/Dashboard/AddNewProject' element={<AddNewProject />} />
          <Route path='/Dashboard/AddNewEvent' element={<AddNewEvents />} />
          <Route path='/Dashboard/Peers' element={<StudentList />} />
          <Route path='/Dashboard/Chats/:userID' element={<Messaging />} />
          <Route path='/Dashboard/User/:userID' element={<UserInfo />} />
          <Route path='/Dashboard/Profile/:userID' element={<Profile />} />
          <Route path='/Dashboard/Project/:projectID' element={<GradeProjectPage/>}/>
        </Route> */}
        {currentUser && (
          <Route
            path='/Dashboard'
            element={
              <>
                <div className='row'>
                  <div style={{ width: '4.5rem' }}>
                    <Sidebar />
                  </div>
                  <div style={{ marginLeft: '0.4rem' }}>
                    <Outlet />
                  </div>
                </div>
              </>
            }
          >
            <Route path='/Dashboard' element={<Dashoboard />} />
            <Route path='/Dashboard/AddNewProject' element={<AddNewProject />} />
            <Route path='/Dashboard/AddNewEvent' element={<AddNewEvents />} />
            <Route path='/Dashboard/AddNewJobPosting' element={<PostJob />} />
            <Route path='/Dashboard/Peers' element={<StudentList />} />
            <Route path='/Dashboard/Connections' element={<AllUsersList />} />
            <Route path='/Dashboard/Chats/:userID' element={<Messaging />} />
            <Route path='/Dashboard/User/:userID' element={<UserInfo />} />
            <Route path='/Dashboard/Profile/:userID' element={<Profile />} />
            <Route path='/Dashboard/Project/:projectID' element={<GradeProjectPage />} />
          </Route>
        )}
      </Routes>
      <div>
        {location.pathname.startsWith('/Dashboard') && <ChatBot />}
      </div>

    </>
  );
}

export default App;
