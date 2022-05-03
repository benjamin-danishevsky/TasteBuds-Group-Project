import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as eventActions from '../store/events';

const Events = () => {
    const dispatch = useDispatch()

    useEffect(async () => {
        await dispatch(eventActions.getAllEventsThunk())
    }, [dispatch])

    const events = useSelector(state => state.events);

    const eventsData = Object.values(events)

    return (
        <>
            <div>
                {eventsData.map((event, idx) => (
                    <a href={`/events/${event.id}`} key={idx}>
                        <h3>{event?.title}</h3>
                        <ul>
                            <li>Posted By: </li>
                            <li>{event?.description}</li>
                            <li>{event?.location}</li>
                            <li>{event?.date}</li>
                            <img src={event?.background_img}/>
                            <button>JOIN/LEAVE</button>
                        </ul>
                    </a>
                ))}
            </div>
        </>
    )

}

export default Events
