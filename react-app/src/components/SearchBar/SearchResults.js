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
            <div>
                {searchData.map((event, idx) => (
                    <a href={`/events/${event.id}`} key={idx}>
                        <h3>{event?.title}</h3>
                        <ul>
                            <li>Posted By: </li>
                            <li>{event?.description}</li>
                            <li>{event?.location}</li>
                            <li>{event?.date}</li>
                            <img src={event?.background_img}/>
                        </ul>
                    </a>
                ))}
            </div>
        </>
    )

}

export default SearchResults
