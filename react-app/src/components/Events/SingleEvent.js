import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as eventActions from "../../store/events";
import * as usersAttendingActions from '../../store/users-in-event'
import UpdateEventForm from "./UpdateEventForm"
import { BsPersonCircle } from 'react-icons/bs'
import './SingleEvent.css'


const SingleEvent = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const [users, setUsers] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [joinedEvent, setJoinedEvent] = useState(false)
    const [visibility, setVisibility] = useState(true)

    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        if (!sessionUser) {
            setVisibility(false)
        }
    }, [])

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
    let eventOwner = users?.filter((user) => user?.id === ownerId);

    console.log(eventOwner, 'event owner #@$_', users, 'users -1231')
    let content = null
    if (showEditForm) {
        content = (
            <>
                <UpdateEventForm event={event} hideForm={() => setShowEditForm(false)} />
            </>
        )
    }
    const user = useSelector(state => state.session.user)
    const attendees = useSelector((state) => state.usersAttending)
    const attendeeList = Object.values(attendees)

    useEffect(() => {
        if (attendees[user?.id]) setJoinedEvent(true);
    }, [attendees, user])


    return (
        <>
            <div className="topNavEvent">
                <h1>{event?.title}</h1>
                <span>{`Date/Time: ${event?.date}`}</span>
                <div>Hosted by: {eventOwner[0]?.username}</div>
            </div>
            <div className="allNav">
                <div className="bottomNavEvent">
                    <img src={event?.background_img} style={{ width: '700px', height: '500px' }} />
                    <p className="descriptionBox">{`Description: ${event?.description}`}</p>
                    <p>{`Location: ${event?.location}`}</p>
                    <button
                        onClick={() => {
                            dispatch(eventActions.deleteEventThunk(id));
                            history.push('/events')
                        }}
                    >
                        DELETE EVENT
                    </button>
                    <button
                        onClick={() => setShowEditForm(true)}
                    >
                        EDIT EVENT</button>
                    {showEditForm && content}
                </div>
                <div className='attendeesCards'>
                    <ul>
                        <h1 className='attendeeHeader'>Attendees</h1>
                        {attendeeList.map(attendee => (
                            <div className="personalCard">
                                <li style={{ listStyle: "none" }} >
                                    {attendee.profile_pic ? (
                                        <img style={{ borderRadius: '50%', height: '75px' }} src={attendee.profile_pic} />
                                    ) :
                                        <BsPersonCircle style={{ fontSize: '75px' }} />
                                    }
                                </li>
                                <li style={{ listStyle: "none" }} key={attendee.id} className='personalName'>{attendee.username}</li>
                            </div>
                        ))}
                    </ul>
                </div>
                {joinedEvent
                    ? <button style={{ visibility: visibility ? 'visible' : 'hidden' }} onClick={() => {
                        dispatch(usersAttendingActions.leavingEventThunk(id, user))
                        setJoinedEvent(false)
                    }}>LEAVE EVENT</button>
                    : <button style={{ visibility: visibility ? 'visible' : 'hidden' }} onClick={() => {
                        dispatch(usersAttendingActions.joiningEventThunk(id, user))
                        setJoinedEvent(true)
                    }}>JOIN EVENT</button>
                }
            </div>
        </>
    );
};

export default SingleEvent;
