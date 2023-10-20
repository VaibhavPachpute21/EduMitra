import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import { Routes, Route, Outlet,useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import SingleProject from './components/SingleProject';
import Login from './components/Login';
import Register from './components/Register';
import ProjectList from './components/ProjectList';
import { Dashboard } from './components/Dashboard/Dashboard';
import Profile from './components/Dashboard/Profile';
import Sidebar from './components/Sidebar';
import AddNewProject from './components/Dashboard/AddNewProject';
import StudentList from './components/Dashboard/StudentList';

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
        <Route path='/Project/:projectID' element={<SingleProject />} />
        <Route path='/Dashboard' element={
          <>
            <div className='row'>
              <div style={{ width: '4.5rem' }}><Sidebar /></div>
              <div style={{ marginLeft: '0.4rem' }}><Outlet /></div>
            </div>
          </>
        }>
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/Dashboard/AddNewProject' element={<AddNewProject />} />
          <Route path='/Dashboard/Peers' element={<StudentList />} />
          <Route path='/Dashboard/Profile' element={<Profile />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;
