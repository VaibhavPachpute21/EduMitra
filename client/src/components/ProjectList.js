import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {increment,decrement} from '../actions/cartActions'

const ProjectList = () => {
  const dispatch = useDispatch()
  const projects = [
    {
      id: 1,
      featureImg:'https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/255/061/datas/gallery.jpg',
      title: 'empath.ly',
      description:'empath.ly uses machine learning to analyze emotions during video calls or metaverse activities. We empower employers, marketers, developers, and the visually impaired to empathize remotely.'
    },
    {
      id: 2,
      featureImg:'https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/255/061/datas/gallery.jpg',
      title: 'empath.ly',
      description:'empath.ly uses machine learning to analyze emotions during video calls or metaverse activities. We empower employers, marketers, developers, and the visually impaired to empathize remotely.'
    },
    {
      id: 3,
      featureImg:'https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/255/061/datas/gallery.jpg',
      title: 'empath.ly',
      description:'empath.ly uses machine learning to analyze emotions during video calls or metaverse activities. We empower employers, marketers, developers, and the visually impaired to empathize remotely.'
    },
    {
      id: 4,
      featureImg:'https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/255/061/datas/gallery.jpg',
      title: 'empath.ly',
      description:'empath.ly uses machine learning to analyze emotions during video calls or metaverse activities. We empower employers, marketers, developers, and the visually impaired to empathize remotely.'
    },
  ];

  return (
    <div>
      <div className="container py-4 py-xl-5">
        <div className="row mb-5" style={{ background: 'var(--bs-body-bg)', padding: '12px', boxShadow: '0px 4px 6px 1px rgba(43,49,54,0.35)', borderRadius: '5px' }}>
          <div className="col-sm-10 col-md-7 col-lg-8">
            <h2>Explore Projects from Colleges</h2>
          </div>
          <div className="col" style={{ textAlign: 'right' }}>
            <button className="btn btn-primary fs-5 me-2 py-2 px-4" type="button" style={{ borderRadius: '0px' }}>
              Join The Community
            </button>
          </div>
        </div>
        <div className="row gy-4 row-cols-1 row-cols-md-2">
          {projects.map((project) => (
            <div key={project.id} className="col">
              <Link to={`/Project/${project.id}`} className="text-decoration-none text-black">
                <div className="d-flex flex-column flex-lg-row" data-bss-hover-animate="pulse" style={{ background: 'white', borderRadius: '10px', boxShadow: '2px 4px 7px 1px rgba(43,49,54,0.35)' }}>
                  <div className="w-100">
                    <img
                      className="rounded img-fluid d-block w-100 fit-cover"
                      style={{ height: '200px' }}
                      src="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/255/061/datas/gallery.jpg"
                      alt="Project Thumbnail"
                    />
                  </div>
                  <div className="py-4 py-lg-0 px-lg-4">
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>
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
