import './styles/App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import { Routes, Route, Outlet,useLocation } from 'react-router-dom';
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

function App() {
  const location=useLocation();
  return (
    <>
      {location.pathname.startsWith('/Dashboard')?<></>:<Navbar />}
      <ToastContainer position='top-center'/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Projects' element={<ProjectList />} />
        <Route path='/Events' element={<EventList />} />
        <Route path='/Project/:projectID' element={<SingleProject />} />
        <Route path='/Dashboard' element={
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
          <Route path='/Dashboard/Profile/:userID' element={<Profile />} />
          <Route path='/Dashboard/Project/:projectID' element={<GradeProjectPage/>}/>
        </Route>
      </Routes>

    </>
  );
}

export default App;
