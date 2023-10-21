import React, { useState, useEffect } from 'react';
import '../../styles/AddNewProject.css'
import axios from 'axios'
import { addNewProject } from '../../actions/projectActions'
import { useDispatch, useSelector } from 'react-redux';

function AddNewProject() {
  const dispatch = useDispatch();
  const projectsData = useSelector((state) => state.projectReducer);
  const userData = useSelector(state => state.userLoginReducer)
  const { currentUser } = userData;
  const { loading, error } = projectsData;

  const [project, setProject] = useState({
    creator: currentUser.user._id,
    creatorInfo: {
      name: currentUser.user.name,
      profilePic: currentUser.user.profilePic,
      college: currentUser.user.college,
    },
    pTitle: '',
    shortDescription: '',
    longDescription: '',
    whyChooseProject: '',
    howDiffProject: '',
    futureEnhancement: '',
    builtWith: '',
    difficultiesFaced: '',
    projectImages: [],
  });
  const [imgUploading, setImgUploading] = useState(false);

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
    handleImageUpload(images);
  };

  const handleImageUpload = async (images) => {
    setImgUploading(true);
    try {
      const imageUrls = [];
      for (let index = 0; index < images.length; index++) {
        const image = images[index];
        const formData = new FormData();
        formData.append('image', image);

        const response = await axios.post(
          'https://api.imgbb.com/1/upload?key=fbceae2d513cb2adb77ffbcb1473a512',
          formData
        );

        if (response.data.success) {
          imageUrls.push(response.data.data.url);
          setProject((prevProject) => ({
            ...prevProject,
            projectImages: [...imageUrls],
          }));
          console.log(`Image ${index + 1} uploaded successfully.`);
        } else {
          console.error(`Image ${index + 1} upload failed:`, response.data);
        }
      }
    } catch (error) {
      console.error('Image Upload Error:', error);
    }
    setImgUploading(false);
  };

  useEffect(() => {
    console.log(project);
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewProject(project, currentUser.token))
  };

  return (
    <section className='AddNewProject'>
      <div className="container p-3">
        <h1>Add New Project</h1>
        <form onSubmit={handleSubmit}>
          <label className="form-label font-monospace">Project Title<span className='text-danger'>*</span></label>
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
          <label className="form-label font-monospace" style={{ marginTop: '1.5rem' }}>Short Description<span className='text-danger'>*</span></label>
          <textarea
            className="form-control shadow-none"
            required
            name="shortDescription"
            rows="5"
            value={project.shortDescription}
            onChange={handleInputChange}
          />
          <label className="form-label font-monospace" style={{ marginTop: '1.5rem' }}>Long Description<span className='text-danger'>*</span></label>
          <textarea
            className="form-control shadow-none"
            required
            name="longDescription"
            rows="5"
            value={project.longDescription}
            onChange={handleInputChange}
          />
          <label className="form-label font-monospace" style={{ marginTop: '1.5rem' }}>Why You Choose This Project<span className='text-danger'>*</span></label>
          <textarea
            className="form-control shadow-none"
            required
            name="whyChooseProject"
            rows="5"
            value={project.whyChooseProject}
            onChange={handleInputChange}
          />
          <label className="form-label font-monospace" style={{ marginTop: '1.5rem' }}>How this Project gonna make difference?<span className='text-danger'>*</span></label>
          <textarea
            className="form-control shadow-none"
            required
            name="howDiffProject"
            rows="5"
            value={project.howDiffProject}
            onChange={handleInputChange}
          />
          <label className="form-label font-monospace" style={{ marginTop: '1.5rem' }}>Describe Difficulties Faced<span className='text-danger'>*</span></label>
          <textarea
            className="form-control shadow-none"
            required
            name="difficultiesFaced"
            rows="5"
            value={project.difficultiesFaced}
            onChange={handleInputChange}
          />
          <label className="form-label font-monospace" style={{ marginTop: '1.5rem' }}>Future Enhancements<span className='text-danger'>*</span></label>
          <textarea
            className="form-control shadow-none"
            required
            name="futureEnhancement"
            rows="5"
            value={project.futureEnhancement}
            onChange={handleInputChange}
          />
          <label className="form-label font-monospace" style={{ marginTop: '1.5rem' }}>Built With<span className='text-danger'>*</span><br /><span>Add with comma-separation eg.VSCode,Javascript,MySQL</span></label>
          <textarea
            className="form-control shadow-none"
            required
            name="builtWith"
            rows="2"
            value={project.builtWith}
            onChange={handleInputChange}
          />
          <label className="form-label font-monospace" style={{ marginTop: '1.5rem' }}>Upload Project Images<span className='text-danger'>*</span></label>
          <input
            className="form-control border-0"
            required
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
          {imgUploading && <p>Uploading...</p>}
          <button className="btn btn-primary mt-3" type="submit">Upload Project</button>
        </form>
      </div>
    </section>
  );
}

export default AddNewProject;
