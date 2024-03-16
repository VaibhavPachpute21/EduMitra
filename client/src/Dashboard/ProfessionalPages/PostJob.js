import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addNewJob } from '../../actions/jobActions'
import { toast } from 'react-toastify'
import '../../styles/AddNewProject.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
        [],
        [{ align: [] }], // dropdown with defaults from theme
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
    "align",
];

const PostJob = () => {
    const dispatch = useDispatch()

    const userData = useSelector(state => state.userLoginReducer)
    const { currentUser } = userData;
    const [job, setJob] = useState({
        postedBy: currentUser.user._id,
        companyName: '',
        jobName: '',
        jobDescription: '',
        jobType: '',
        applyDate: '',
        contactEmail: '',
        location: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJob({
            ...job,
            [name]: value,
        });
    };

    const handleQuillChange = (propertyName) => (value) => {
        setJob({
            ...job,
            [propertyName]: value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const isAnyFieldEmpty = Object.values(job).some(value => value === '');
        if (isAnyFieldEmpty) {
            toast.error("All fields are required");
            return;
        }
        dispatch(addNewJob(job))
        setJob({
            postedBy: currentUser.user._id,
            companyName: '',
            jobName: '',
            jobDescription: '',
            jobType: '',
            applyDate: '',
            contactEmail: '',
            location: '',
        })

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
                            value={job.jobName} onChange={handleInputChange} />
                    </div>

                    <div>
                        <label className="form-label heading2 fs-6">Job Type<span className='text-danger'>*</span></label>
                        <select
                            className="form-select form-control shadow-none"
                            name="jobType" required={true} value={job.jobType} onChange={handleInputChange}
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
                            value={job.companyName} onChange={handleInputChange} />
                    </div>

                    <div>
                        <label className="form-label heading2 fs-6">Job Description<span className='text-danger'>*</span></label>
                        {/* <textarea className="form-control shadow-none" required name="jobDescription"
                            rows="5" value={job.jobDescription} onChange={handleInputChange} placeholder='Please mention mention requirements, key skills required etc.'
                        /> */}
                        <ReactQuill className="quill-form" theme="snow" modules={modules} formats={formats} placeholder='Please mention mention requirements, key skills required etc.'
                            name="jobDescription" value={job.jobDescription} onChange={handleQuillChange('jobDescription')} />

                    </div>
                    <div>
                        <label className="form-label heading2 fs-6">Location<span className='text-danger'>*</span></label>
                        <textarea className="form-control shadow-none"
                            required name="location" placeholder='Please mention job location'
                            rows="2" value={job.location} onChange={handleInputChange} />
                    </div>

                    <div>
                        <label className="form-label heading2 fs-6" style={{ marginTop: '1.5rem' }}>Last Date to Apply<span className='text-danger'>*</span></label>
                        <input className="form-control shadow-none" type={'date'}
                            required name="applyDate" value={job.applyDate} onChange={handleInputChange} />
                    </div>

                    <div>
                        <label className="form-label heading2 fs-6">Mail<span className='text-danger'>*</span></label>
                        <input className="form-control shadow-none" type={'email'}
                            required name="contactEmail" placeholder='Please mention recruiters mail'
                            value={job.contactEmail} onChange={handleInputChange} />
                    </div>
                    <button className="btn button2 mt-3" type="submit">Add Job</button>
                </form>
            </div>
        </section>
    )
}

export default PostJob