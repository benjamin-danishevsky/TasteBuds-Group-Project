import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import * as eventActions from '../store/events';

const SingleEvent = () => {
    const dispatch = useDispatch()
    const {id} = useParams();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);

    useEffect(() => {
        dispatch(eventActions.getSingleEventThunk(id))
    }, [dispatch])

    const event = useSelector(state => state.events[id]);
    const ownerId = event?.owner_id;


    const eventOwner = users?.filter(user => user.id === ownerId)

    console.log(eventOwner)

    return (
        <>
            <span>{event?.date}</span>
            <h1>{event?.title}</h1>
            <div>Hosted By {eventOwner[0]?.username}</div>
            <img src={event?.background_img}/>
            <p>{event?.description}</p>
        </>
    )

}

export default SingleEvent
