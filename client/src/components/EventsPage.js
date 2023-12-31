import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getAllEvents } from '../actions/eventActions';

const EventList = () => {
    const dispatch = useDispatch()
    const eventsData = useSelector((state) => state.eventReducers);
    const { loading, events, error } = eventsData;

    useEffect(() => {
        dispatch(getAllEvents())
        console.log(events)
    }, [dispatch])

    return (
        <div>
            <div className="container py-4 py-xl-5">
                <div className="row mb-5" style={{ background: 'var(--bs-body-bg)', padding: '12px', boxShadow: '0px 4px 6px 1px rgba(43,49,54,0.35)', borderRadius: '5px' }}>
                    <div className="col-sm-10 col-md-7 col-lg-8">
                        <h2>Explore events from Colleges</h2>
                    </div>
                    <div className="col" style={{ textAlign: 'right' }}>
                        <Link className="btn btn-primary fs-5 me-2 py-2 px-4" to={'/Register'} style={{ borderRadius: '0px' }}>
                            Join The Community
                        </Link>
                    </div>
                </div>
                <div className="row gy-4 row-cols-1 row-cols-md-2">
                    {events.map((event) => (
                        <div key={event._id} className="col">
                            <Link to={``} className="text-decoration-none text-black">
                                <div className="d-flex flex-column flex-lg-row" data-bss-hover-animate="pulse" style={{ background: 'white', borderRadius: '10px', boxShadow: '2px 4px 7px 1px rgba(43,49,54,0.35)' }}>
                                    <div className="w-100">
                                        <img
                                            className="rounded img-fluid d-block w-100 fit-cover"
                                            style={{ height: '200px' }}
                                            src={event.eventImage[0]}
                                            alt="Project Thumbnail"
                                        />
                                    </div>
                                    <div className="py-4 py-lg-0 px-lg-4">
                                        <h4>{event.eventName}</h4>
                                        <p>{event.eventDescription}</p>
                                        <p>Orgnised By: {event.organizer}</p>
                                        <p>Location: {event.location}</p>
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

export default EventList;
