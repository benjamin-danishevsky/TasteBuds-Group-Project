import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as eventActions from '../../store/events';
import './Events.css'


const Events = () => {
    const dispatch = useDispatch()

    useEffect(async () => {
        await dispatch(eventActions.getAllEventsThunk())
    }, [dispatch])

    const events = useSelector(state => state.events);

    const eventsData = Object.values(events)

    return (
        <>
            <h1 className='header'>All Events</h1>
            <div className='parentContent'>
                {eventsData.map((event, idx) => (
                    <a href={`/events/${event.id}`} key={idx}>
                        {/* <h3>{event?.title}</h3> */}
                            <div className='eventContent'>
                                <p className='subContent'>{event?.title}</p>
                                {/* <p className='subContent'>{event?.location}</p> */}
                                <img src={event?.background_img} style={{ height: "200px", width: "300px" }} className='eventImg' />
                            </div>
                            {/* <li>Posted By: </li> */}
                            {/* <li>{event?.description}</li> */}
                            {/* <li>{event?.date}</li> */}

                    </a>
                ))}
            </div>
        </>
    )
}

export default Events
