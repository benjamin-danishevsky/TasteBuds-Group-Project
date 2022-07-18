import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import * as eventActions from '../../store/events';
import '../Groups/Groups.css'


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
                    <>
                    {console.log('EVENT', event)}
                        <div className="allGroups" key={idx}>
                            <a href={`/events/${event.id}`} key={idx}>
                                <ul>
                                    <div className="allGroupsImg">
                                        <img src={event?.background_img} alt={event?.name} style={{ height: "200px", width: "300px" }} />
                                    </div>
                                    <div className="allGroupsInfo grow">
                                        <li style={{ color:"#ffc100", fontWeight:'bold'}}>{moment(event?.date).format('LLLL')}</li>
                                        <span style={{ fontWeight: "bold", fontSize: "30px", marginBottom: "20px" }}><li>{event?.title}</li></span>
                                        <li>{event?.description}</li>
                                        <li><i class="fa-solid fa-location-dot"></i> {event?.location}</li>
                                    </div>
                                </ul>
                            </a>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default Events
