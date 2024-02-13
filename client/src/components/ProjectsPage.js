import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from '../actions/cartActions'
import { getAllProjects } from '../actions/projectActions';

const ProjectList = () => {
const dispatch = useDispatch()
const projectsData = useSelector((state) => state.projectReducer);
const { loading, projects, error } = projectsData;

useEffect(() => {
dispatch(getAllProjects())
console.log(projects)
}, [dispatch])

return (
<div>
  <div className="container py-4 py-xl-5">
    <div className="row mb-5" style={{ background: 'var(--bs-body-bg)' , padding: '12px' ,
      boxShadow: '0px 4px 6px 1px rgba(43,49,54,0.35)' , borderRadius: '5px' }}>
      <div className="col-sm-10 col-md-7 col-lg-8">
        <h2>Explore Projects from Colleges</h2>
      </div>
      <div className="col" style={{ textAlign: 'right' }}>
        <Link className="btn btn-primary fs-5 me-2 py-2 px-4" to={'/Register'} style={{ borderRadius: '0px' }}>
        Join The Community
        </Link>
      </div>
    </div>
    <div className="row gy-4 row-cols-1 row-cols-md-2">
      {projects.map((project) => (
      <div key={project._id} className="col">
        <Link to={`/Project/${project._id}`} className="text-decoration-none text-black">
        <div className="d-flex flex-column flex-lg-row" data-bss-hover-animate="pulse" style={{ background: 'white' ,
          borderRadius: '10px' , boxShadow: '2px 4px 7px 1px rgba(43,49,54,0.35)' , overflow: 'hidden' , padding: '10px'
          }}>
          <div className="w-100">
            <figure>
              <img className="rounded img-fluid d-block w-100 fit-contain" style={{ height: '200px' , minWidth: '150px'
                }} src={project.projectImages[0]} alt="Project Thumbnail" />
            </figure>
          </div>
          <div className="py-4 py-lg-0 px-lg-4">
            <h4>{project.domain}</h4>
            <h4>{project.pTitle}</h4>
            <p className='textStyle1' dangerouslySetInnerHTML={{ __html: project.shortDescription }}></p>
            <p className='textStyle1'>Uploaded On: {project.createdAt.split('T')[0]}</p>
            <p className='textStyle1'>Uploaded By: {project.creatorInfo.name}</p>
          </div>
        </div>
        </Link>
      </div>
      ))}
    </div>
  </div>
</div>
);
};

export default ProjectList;