import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addNewEvent } from '../../actions/eventActions'
import { toast } from 'react-toastify'
import '../../styles/AddNewProject.css'

const PostJob = () => {
    const dispatch=useDispatch()

    const userData = useSelector(state => state.userLoginReducer)
    const { currentUser } = userData;
    const [event, setEvent] = useState({
        createdBy: currentUser.user._id,
        companyName: '',
        jobName: '',
        jobDescription: '',
        jobType: '',
        applyDate: '',
        contactEmail: '',
        location: '',
        eventImage: []
    });
    const [imgUploading, setImgUploading] = useState(false);

    const handleImageChange = (e) => {
        const images = Array.from(e.target.files);
        setEvent({
            ...event,
            eventImage: images,
        });
        handleImageUpload(images);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEvent({
            ...event,
            [name]: value,
        });
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
                    setEvent((prevProject) => ({
                        ...prevProject,
                        eventImage: [...imageUrls],
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const isAnyFieldEmpty = Object.values(event).some(value => value === '');
        if (isAnyFieldEmpty) {
            toast.error("All fields are required");
            return;
        }
        dispatch(addNewEvent(event, currentUser.token))

    };

    return (
        <section className='AddNewProject'>
            <div className="container p-3">
                <h1 className='heading2'>Add New Job Posting</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="form-label heading2 fs-6">Job Title<span className='text-danger'>*</span></label>
                        <input className="form-control shadow-none" 
                            type="text" name="jobName" autoFocus placeholder='eg. Web Developer, Data Analyst'
                            required minLength="3" maxLength="255"
                            value={event.jobName} onChange={handleInputChange} />
                    </div>

                    <div>
                        <label className="form-label heading2 fs-6">Job Type<span className='text-danger'>*</span></label>
                        <select
                            className="form-select form-control shadow-none"
                            name="jobType"
                            required={true}
                            value={event.jobType}
                            onChange={handleInputChange}
                        >
                            <option>--Select Type Of Job --</option>
                            <option value="Internship">Internship</option>
                            <option value="Full Time Job">Full Time Job</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label heading2 fs-6">Company Name<span className='text-danger'>*</span></label>
                        <input className="form-control shadow-none"
                            type="text" name="companyName" placeholder='eg. Google, Wipro, etc.'
                            required minLength="3" maxLength="255"
                            value={event.companyName} onChange={handleInputChange} />
                    </div>

                    <div>
                        <label className="form-label heading2 fs-6">Job Description<span className='text-danger'>*</span></label>
                        <textarea className="form-control shadow-none" required name="jobDescription"
                            rows="5" value={event.jobDescription} onChange={handleInputChange} placeholder='Please mention mention requirements, key skills required etc.'
                        />

                    </div>
                    <div>
                        <label className="form-label heading2 fs-6">Location<span className='text-danger'>*</span></label>
                        <textarea className="form-control shadow-none"
                            required name="location" placeholder='Please mention job location'
                            rows="2" value={event.location} onChange={handleInputChange} />
                    </div>

                    <div>
                        <label className="form-label heading2 fs-6" style={{ marginTop: '1.5rem' }}>Last Date to Apply<span className='text-danger'>*</span></label>
                        <input className="form-control shadow-none" type={'date'}
                            required name="applyDate" value={event.applyDate} onChange={handleInputChange} />
                    </div>

                    <div>
                        <label className="form-label heading2 fs-6">Mail<span className='text-danger'>*</span></label>
                        <input className="form-control shadow-none" type={'email'}
                            required name="contactEmail" placeholder='Please mention recruiters mail'
                            value={event.contactEmail} onChange={handleInputChange} />
                    </div>

                    {/* <div>
                        <label className="form-label heading2 fs-6" style={{ marginTop: '1.5rem' }}>Upload Event Images<span className='text-danger'>*</span></label>
                        <input
                            className="form-control"
                            required
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {imgUploading && <p>Uploading...</p>}
                    </div> */}
                    <button className="btn button2 mt-3" type="submit">Add Job</button>
                </form>
            </div>
        </section>
    )
}

export default PostJob