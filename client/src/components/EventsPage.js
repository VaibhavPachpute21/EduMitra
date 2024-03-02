import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getAllEvents } from '../actions/eventActions';
import Loading from './Common/Loading';

const EventList = () => {
    const dispatch = useDispatch()
    const eventsData = useSelector((state) => state.eventReducers);
    const { loading, events, error } = eventsData;
    const [openE, setOE] = useState(null);

    useEffect(() => {
        dispatch(getAllEvents())
        // console.log(events)
    }, [dispatch])

    return (
        <div>
            <div className="container py-4 py-xl-5">
                <div className="row mb-5" style={{ backgroundColor: '#F6BC8C', padding: '12px', border: '2px solid #B0522A' }}>
                    <div className="col-sm-10 col-md-7 col-lg-8">
                        <h2 className='heading2'>Explore Events</h2>
                    </div>
                    <div className="col" style={{ textAlign: 'right' }}>
                        <Link className="btn button1 fs-5 me-2 py-2 px-4" to={'/Register'} style={{ borderRadius: '0px' }}>
                            Join The Community
                        </Link>
                    </div>
                </div>
                {/* Modal */}
                <div class="modal fade mb-0" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content" style={{border:'2px solid #B0522A'}}>
                            <div class="modal-header" style={{borderBottom:'1px solid #B0522A'}}>
                                <h1 class="modal-title heading3 text-black" id="exampleModalLabel">{openE == null ? '' : events[openE].eventName}</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <figure>
                                    <img
                                        className="rounded img-fluid d-block w-100 fit-cover"
                                        style={{ height: '250px' }}
                                        src={openE == null ? '' : events[openE].eventImage[0].toString()}
                                        alt="Project Thumbnail"
                                    /></figure>
                                <div className="py-2 py-lg-0 px-lg-2 mt-3">
                                    <p className='textStyle2 text-black mb-0'>{openE == null ? '' : events[openE].eventType}</p>
                                    <h4 className='heading2 fs-4'>{openE == null ? '' : events[openE].eventName}</h4>
                                    <p className='textStyle1 mt-2'>{openE == null ? '' : events[openE].eventDescription}</p>
                                    <p className='textStyle2 text-black mt-2 mb-1'><strong>Orgnised By:</strong> {openE == null ? '' : events[openE].organizer}</p>
                                    <p className='textStyle2 text-black mb-1'><strong>Date:</strong> {openE == null ? '' : events[openE].eventDate.split('T')[0]}</p>
                                    <p className='textStyle2 text-black mb-1'><strong>Cotact:</strong> <a className='text-decoration-none text-black' href={`mailto:${openE ? events[openE].contactEmail : ''}`}>{openE == null ? '' : events[openE].contactEmail}</a></p>
                                    <p className='textStyle2 text-black'><strong>Location:</strong> {openE == null ? '' : events[openE].location}</p>
                                </div>
                            </div>
                            {/* <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div> */}
                        </div>
                    </div>
                </div>
                {/* Modal */}
                <div className="row gy-4 row-cols-1 row-cols-md-2">
                    {loading ? <><Loading/> </> : events.map((event, index) => (
                        <div key={event._id} className="col">
                            <a className="text-decoration-none text-black cardStyle1" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setOE(index) }}>
                                <div className="d-flex flex-column flex-lg-row">
                                    <div className="w-100">
                                        <figure>
                                            <img
                                                className="img-fluid d-block w-100"
                                                style={{ height: '200px' }}
                                                src={event.eventImage[0]}
                                                alt="Project Thumbnail"
                                            />
                                        </figure>
                                    </div>
                                    <div className="py-4 py-lg-2 px-lg-4">
                                        <h4 className='heading3 fw-bold text-black mb-3'>{event.eventName}</h4>
                                        <p className='textStyle1 text-black mb-3'>{event.eventDescription}</p>
                                        <p className='textStyle3 mb-1 text-black'><strong>Orgnised By:</strong> {event.organizer}</p>
                                        <p className='textStyle3 text-black'><strong>Location:</strong> {event.location}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventList;
