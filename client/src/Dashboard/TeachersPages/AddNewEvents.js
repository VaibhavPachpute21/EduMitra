import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addNewEvent } from '../../actions/eventActions'
import { toast } from 'react-toastify'
import '../../styles/AddNewProject.css'

const AddNewEvents = () => {
    const dispatch=useDispatch()

    const userData = useSelector(state => state.userLoginReducer)
    const { currentUser } = userData;
    const [event, setEvent] = useState({
        createdBy: currentUser.user._id,
        organizer: '',
        eventName: '',
        eventDescription: '',
        eventType: '',
        eventDate: '',
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
                <h1 className='heading2'>Add New Event</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="form-label heading2 fs-6">Event Title<span className='text-danger'>*</span></label>
                        <input className="form-control shadow-none"
                            type="text" name="eventName" autoFocus
                            required minLength="3" maxLength="255"
                            value={event.eventName} onChange={handleInputChange} />
                    </div>

                    <div>
                        <label className="form-label heading2 fs-6">Event Type<span className='text-danger'>*</span></label>
                        <select
                            className="form-select form-control shadow-none"
                            name="eventType"
                            required={true}
                            value={event.eventType}
                            onChange={handleInputChange}
                        >
                            <option>--Select Type Of Event --</option>
                            <option value="Competion">Competion</option>
                            <option value="Hackathon">Hackathon</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Seminar">Seminar</option>
                            <option value="Conference">Conference</option>
                            <option value="Exhibition">Exhibition</option>
                            <option value="Charity Fundraiser">Charity Fundraiser</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label heading2 fs-6">Who is the organizer<span className='text-danger'>*</span></label>
                        <input className="form-control shadow-none"
                            type="text" name="organizer"
                            required minLength="3" maxLength="255"
                            value={event.organizer} onChange={handleInputChange} />
                    </div>

                    <div>
                        <label className="form-label heading2 fs-6">Event Description<span className='text-danger'>*</span></label>
                        <textarea className="form-control shadow-none" required name="eventDescription"
                            rows="5" value={event.eventDescription} onChange={handleInputChange}
                        />

                    </div>
                    <div>
                        <label className="form-label heading2 fs-6">Location<span className='text-danger'>*</span></label>
                        <textarea className="form-control shadow-none"
                            required name="location"
                            rows="5" value={event.location} onChange={handleInputChange} />
                    </div>

                    <div>
                        <label className="form-label heading2 fs-6" style={{ marginTop: '1.5rem' }}>Date<span className='text-danger'>*</span></label>
                        <input className="form-control shadow-none" type={'date'}
                            required name="eventDate" value={event.eventDate} onChange={handleInputChange} />
                    </div>

                    <div>
                        <label className="form-label heading2 fs-6">Mail<span className='text-danger'>*</span></label>
                        <input className="form-control shadow-none" type={'email'}
                            required name="contactEmail"
                            value={event.contactEmail} onChange={handleInputChange} />
                    </div>

                    <div>
                        <label className="form-label heading2 fs-6" style={{ marginTop: '1.5rem' }}>Upload Event Images<span className='text-danger'>*</span></label>
                        <input
                            className="form-control"
                            required
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {imgUploading && <p>Uploading...</p>}
                    </div>
                    <button className="btn btn-primary mt-3" type="submit">Add Event</button>
                </form>
            </div>
        </section>
    )
}

export default AddNewEvents