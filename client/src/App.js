import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Routes,Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SingleProject from './components/SingleProject';

import Login from './components/Login';
import Register from './components/Register';
import ProjectList from './components/ProjectList';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Projects' element={<ProjectList/>}/>
        <Route path='/Project/:id' element={<SingleProject/>}/>
      </Routes>

    </>
  );
}

export default App;
