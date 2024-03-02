import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjects } from '../actions/projectActions';
import Loading from './Common/Loading';

const ProjectList = () => {
  const dispatch = useDispatch()
  const projectsData = useSelector((state) => state.projectReducer);
  const { loading, projects, error } = projectsData;

  useEffect(() => {
    dispatch(getAllProjects())
    // console.log(projects)
  }, [dispatch])

  return (
    <div>
      <div className="container py-4 py-xl-5">
        <div className="row mb-5" style={{
          backgroundColor: '#F6BC8C', padding: '12px', border: '2px solid #B0522A'
        }}>
          <div className="col-sm-10 col-md-7 col-lg-8">
            <h2 className='heading2'>Explore Projects from Colleges</h2>
          </div>
          <div className="col" style={{ textAlign: 'right' }}>
            <Link className="btn button1 fs-5 me-2 py-2 px-4" to={'/Register'} style={{ borderRadius: '0px' }}>
              Join The Community
            </Link>
          </div>
        </div>
        <div className="row gy-4 row-cols-1 row-cols-md-2">
          {loading ? <><Loading/> </> :projects.reverse().map((project) => (
            <div key={project._id} className="col">
              <Link to={`/Project/${project._id}`} className="text-decoration-none text-black">
                <div className="d-flex flex-column flex-lg-row cardStyle1">
                  <div className="w-100">
                    <figure>
                      <img className="rounded img-fluid d-block w-100 fit-contain" style={{
                        height: '200px', minWidth: '150px'
                      }} src={project.projectImages[0]} alt="Project Thumbnail" />
                    </figure>
                  </div>
                  <div className="py-4 py-lg-2 px-lg-4">
                    <h4 className='textStyle3 text-muted text-black'>{project.domain}</h4>
                    <h4 className='heading3 fw-bold text-black mb-3'>{project.pTitle}</h4>
                    <p className='textStyle1 text-black mb-3' dangerouslySetInnerHTML={{ __html: project.shortDescription }}></p>
                    <p className='textStyle3 mb-1 text-black'><strong>Uploaded On:</strong> {project.createdAt.split('T')[0]}</p>
                    <p className='textStyle3 text-black'><strong>Uploaded By:</strong> {project.creatorInfo.name}</p>
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