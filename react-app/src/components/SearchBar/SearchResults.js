import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as eventActions from '../../store/events';

const SearchResults = () => {
    const dispatch = useDispatch()

    useEffect(async () => {
        await dispatch(eventActions.getAllEventsThunk())
    }, [dispatch])

    const searches = useSelector(state => state.searches);

    const searchData = Object.values(searches)

    return (
        <>
            <div className='parentContent'>
                {searchData.map((event, idx) => (
                     <a href={`/events/${event.id}`} key={idx}>
                     {/* <h3>{event?.title}</h3> */}
                         <div className='eventContent'>
                             <p className='subContent'>{event?.title}</p>
                             <p>{event?.location}</p>
                             <p>{event?.description}</p>
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

export default SearchResults
