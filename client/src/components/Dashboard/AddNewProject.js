import React, { useState } from 'react';
import '../styles/AddNewProject.css'

function AddNewProject() {
  const [project, setProject] = useState({
    pTitle: '',
    shortDescription: '',
    longDescription: '',
    whyChooseProject: '',
    difficultiesFaced: '',
    projectImages: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject({
      ...project,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const images = Array.from(e.target.files);
    setProject({
      ...project,
      projectImages: images,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to the server
    console.log('Form Data:', project);
  };

  return (
    <section className='AddNewProject'>
      <div className="container p-3">
        <h1>Add New Project</h1>
        <form onSubmit={handleSubmit}>
          <label className="form-label font-monospace">Project Title</label>
          <input
            className="form-control shadow-none"
            type="text"
            name="pTitle"
            autoFocus
            required
            minLength="3"
            maxLength="255"
            value={project.pTitle}
            onChange={handleInputChange}
          />
          <label className="form-label font-monospace" style={{ marginTop: '1.5rem' }}>Short Description</label>
          <textarea
            className="form-control shadow-none"
            name="shortDescription"
            rows="5"
            value={project.shortDescription}
            onChange={handleInputChange}
          />
          <label className="form-label font-monospace" style={{ marginTop: '1.5rem' }}>Long Description</label>
          <textarea
            className="form-control shadow-none"
            name="longDescription"
            rows="5"
            value={project.longDescription}
            onChange={handleInputChange}
          />
          <label className="form-label font-monospace" style={{ marginTop: '1.5rem' }}>Why You Choose This Project</label>
          <textarea
            className="form-control shadow-none"
            name="whyChooseProject"
            rows="5"
            value={project.whyChooseProject}
            onChange={handleInputChange}
          />
          <label className="form-label font-monospace" style={{ marginTop: '1.5rem' }}>Describe Difficulties Faced</label>
          <textarea
            className="form-control shadow-none"
            name="difficultiesFaced"
            rows="5"
            value={project.difficultiesFaced}
            onChange={handleInputChange}
          />
          <label className="form-label font-monospace" style={{ marginTop: '1.5rem' }}>Upload Project Images</label>
          <input
            className="form-control border-0"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
          <button className="btn btn-primary mt-3" type="submit">Upload Project</button>
        </form>
      </div>
    </section>
  );
}

export default AddNewProject;
