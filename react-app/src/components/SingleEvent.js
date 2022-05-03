import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as eventActions from "../store/events";
import * as usersAttendingActions from '../store/users-in-event'
import UpdateEventForm from "./UpdateEventForm"

const SingleEvent = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const [users, setUsers] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [joinedEvent, setJoinedEvent] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/users/");
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);

    useEffect(() => {
        dispatch(eventActions.getSingleEventThunk(id));
        dispatch(usersAttendingActions.usersAttendingThunk(id))
    }, [dispatch]);

    const event = useSelector((state) => state.events[id]);

    const ownerId = event?.owner_id;
    const eventOwner = users?.filter((user) => user.id === ownerId);
    let content = null
    if(showEditForm){
        content = (
            <>
                <UpdateEventForm event={event} hideForm={() => setShowEditForm(false)}/>
            </>
        )
    }
    const user = useSelector(state => state.session.user)
    const attendees = useSelector((state) => state.usersAttending)
    const attendeeList = Object.values(attendees)

    useEffect(() => {
        if(attendees[user.id]) setJoinedEvent(true);
    }, [attendees, user])


    return (
        <>
            <span>{event?.date}</span>
            <h1>{event?.title}</h1>
            <div>Hosted By {eventOwner[0]?.username}</div>
            <img src={event?.background_img} />
            <p>{event?.description}</p>
            <p>{event?.location}</p>
            <button
                onClick={() => {
                    dispatch(eventActions.deleteEventThunk(id));
                    history.push('/events')
                }}
            >
                DELETE
            </button>
            <button
                onClick={() => setShowEditForm(true)}
            >
                EDIT</button>
            {showEditForm && content}

            <ul>Attendees
                {attendeeList.map(attendee =>(
                    <li key={attendee.id}>{attendee.username}</li>
                ))}
            </ul>

            {joinedEvent
                ? <button onClick={() => {
                    setJoinedEvent(false)
                }}>LEAVE</button>
                : <button onClick={() => {
                    dispatch(usersAttendingActions.joiningEventThunk(id, user))
                    setJoinedEvent(true)
                }}>JOIN</button>
            }
        </>
    );
};

export default SingleEvent;
