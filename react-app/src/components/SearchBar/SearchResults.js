import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import * as eventActions from '../../store/events';
import './search.css'

const SearchResults = () => {
    const dispatch = useDispatch()

    useEffect(async () => {
        await dispatch(eventActions.getAllEventsThunk())
    }, [dispatch])

    const searches = useSelector(state => state.searches);

    const searchData = Object.values(searches)
    console.log('data', searchData);
    return (
        <>
        {searchData.length > 0 ? (

            <div className='search_container'>
                {searchData.map((event, idx) => (
                    <ul>
                        <li>
                    <a href={`/events/${event.id}`} key={idx}>
                         <div className='search_card'>
                            <div className='search_card_header'>
                                        <p style={{ fontWeight: 'bold', color: "orange" }}>{moment(event?.date).format('LLLL')}</p>
                             <p style={{fontWeight:'bold'}}>{event?.title}</p>
                            </div>
                            <div className='search_card_img'>
                             <img src={event?.background_img} className='event_Img' />
                            </div>
                             <p>{event?.location}</p>
                             <p>{event?.description}</p>
                         </div>
                 </a>
                    </li>
                </ul>
                ))}
            </div>
                ): (
                    <div className='no-results'>
                        <h1>Oh crêpe! There were no results.<br/> Donut worry, there are more <a href='/events'>events</a> to explore.</h1>
                    </div>
                )}
        </>
    )

}

export default SearchResults
