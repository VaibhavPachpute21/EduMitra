import React, { useState, useEffect } from 'react';
import '../../styles/AddNewProject.css'
import axios from 'axios'
import { addNewProject } from '../../actions/projectActions'
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify'

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "color",
  "background",
];

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
    domain: '',
    shortDescription: '',
    longDescription: '',
    whyChooseProject: '',
    howDiffProject: '',
    futureEnhancement: '',
    builtWith: '',
    difficultiesFaced: '',
    projectImages: [],
    codeLink: '',
    demoLink: ''
  });
  const [imgUploading, setImgUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject({
      ...project,
      [name]: value,
    });
  };

  const handleQuillChange = (propertyName) => (value) => {
    setProject({
      ...project,
      [propertyName]: value,
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
    const isAnyFieldEmpty = Object.values(project).some(value => value === '');

    // if (isAnyFieldEmpty) {
    //   toast.error("All fields are required");
    //   return;
    // }
    dispatch(addNewProject(project, currentUser.token))
    console.log(project)
  };

  return (
    <section className='AddNewProject'>
      <div className="container p-3">
        <h1>Add New Project</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label font-monospace">Project Title<span className='text-danger'>*</span></label>
            <input className="form-control shadow-none"
              type="text" name="pTitle" autoFocus
              required minLength="3" maxLength="255"
              value={project.pTitle} onChange={handleInputChange} />
          </div>

          <div>
            <label className="form-label font-monospace">Project Domain<span className='text-danger'>*</span></label>
            <select
              className="form-select form-control shadow-none"
              name="domain"
              value={project.domain}
              onChange={handleInputChange}
            >
              <option>--Select Domain--</option>
              <option value="Transportation">Transportation</option>
              <option value="Fintech">Fintech</option>
              <option value="EduTech">EduTech</option>
              <option value="AI\ML">AI\ML</option>
              <option value="Blockchain">Blockchain</option>
              <option value="Visualisation">Visualisation</option>
            </select>
          </div>

          <div>
            <label className="form-label font-monospace">Short Description<span className='text-danger'>*</span></label>
            <ReactQuill className="quill-form" theme="snow" modules={{
              toolbar: [

                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["clean"],
              ],
            }} formats={formats}
              name="shortDescription" value={project.shortDescription} onChange={handleQuillChange('shortDescription')} />
          </div>

          <div>
            <label className="form-label font-monospace">Long Description<span className='text-danger'>*</span></label>
            {/* <textarea className="form-control shadow-none" required name="longDescription"
              rows="5" value={project.longDescription} onChange={handleInputChange}
            /> */}
            <ReactQuill className="quill-form" theme="snow" modules={modules} formats={formats}
              name="longDescription" value={project.longDescription} onChange={handleQuillChange('longDescription')} />
          </div>
          <div>
            <label className="form-label font-monospace">Why You Choose This Project<span className='text-danger'>*</span></label>
            {/* <textarea className="form-control shadow-none"
              required name="whyChooseProject"
              rows="5" value={project.whyChooseProject} onChange={handleInputChange}/> */}
            <ReactQuill className="quill-form" theme="snow" modules={modules} formats={formats}
              name="whyChooseProject" value={project.whyChooseProject} onChange={handleQuillChange('whyChooseProject')} />
          </div>

          <div>
            <label className="form-label font-monospace" style={{ marginTop: '1.5rem' }}>How this Project gonna make difference?<span className='text-danger'>*</span></label>
            {/* <textarea className="form-control shadow-none"
              required name="howDiffProject"
              rows="5" value={project.howDiffProject} onChange={handleInputChange} /> */}
            <ReactQuill className="quill-form" theme="snow" modules={modules} formats={formats}
              name="howDiffProject" value={project.howDiffProject} onChange={handleQuillChange('howDiffProject')} />
          </div>

          <div>
            <label className="form-label font-monospace">Describe Difficulties Faced<span className='text-danger'>*</span></label>
            {/* <textarea className="form-control shadow-none"
              required name="difficultiesFaced" rows="5"
              value={project.difficultiesFaced} onChange={handleInputChange} /> */}
            <ReactQuill className="quill-form" theme="snow" modules={modules} formats={formats}
              name="difficultiesFaced" value={project.difficultiesFaced} onChange={handleQuillChange('difficultiesFaced')} />
          </div>

          <div>
            <label className="form-label font-monospace" style={{ marginTop: '1.5rem' }}>Future Enhancements<span className='text-danger'>*</span></label>
            {/* <textarea className="form-control shadow-none"
              required name="futureEnhancement" rows="5"
              value={project.futureEnhancement} onChange={handleInputChange} /> */}
            <ReactQuill className="quill-form" theme="snow" modules={modules} formats={formats}
              name="futureEnhancement" value={project.futureEnhancement} onChange={handleQuillChange('futureEnhancement')} />
          </div>
          <div>
            <label className="form-label font-monospace" style={{ marginTop: '1.5rem' }}>Built With<span className='text-danger'>*</span><br /><span>Add with comma-separation eg.VSCode,Javascript,MySQL</span></label>
            <textarea
              className="form-control shadow-none"
              required name="builtWith" rows="2" value={project.builtWith} onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="form-label font-monospace">Link to Code/Repository<span className='text-danger'>*</span></label>
            <input className="form-control shadow-none"
              type="text" name="codeLink"
              required
              value={project.codeLink} onChange={handleInputChange} />
          </div>
          <div>
            <label className="form-label font-monospace">Video Link</label>
            <input className="form-control shadow-none"
              type="text" name="demoLink"
              value={project.demoLink} onChange={handleInputChange} />
          </div>

          <div>
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
          </div>


          <button className="btn btn-primary mt-3" type="submit">Upload Project</button>
        </form>
      </div>
    </section>
  );
}

export default AddNewProject;
