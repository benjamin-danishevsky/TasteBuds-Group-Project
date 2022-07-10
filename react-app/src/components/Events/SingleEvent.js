import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as eventActions from "../../store/events";
import * as usersAttendingActions from '../../store/users-in-event'
import * as groupActions from '../../store/groups'
import UpdateEventForm from "./UpdateEventForm"
import { BsPersonCircle } from 'react-icons/bs'
import './SingleEvent.css'
import { motion } from "framer-motion";


const SingleEvent = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const [users, setUsers] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [joinedEvent, setJoinedEvent] = useState(false)
    const [visibility, setVisibility] = useState(true)
    const [canEdit, setCanEdit] = useState(false)

    const sessionUser = useSelector(state => state.session.user)
    const group = useSelector(state => state.groups);
    const event = useSelector((state) => state.events[id]);
    const eventGroup = Object.values(group)[0]
    console.log(eventGroup?.name)

    useEffect(() => {
        if (!sessionUser) {
            setVisibility(false)
        }
    }, [])

    useEffect(() => {
        if (sessionUser) {
            if (sessionUser.id === event?.owner_id) {
                setCanEdit(true)
            }
        }
        doDispatch()
    }, [event])

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

        doDispatch()
    }, [dispatch]);

    const doDispatch = () => {
        return dispatch(groupActions.loadGroupThunk(event?.group_id))
    }
    let eventOwner = users?.filter((user) => user?.id === event?.owner_id);

    //console.log(eventOwner, 'event owner #@$_', users, 'users -1231')
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
                <div>Hosted By {eventOwner[0]?.username}</div>
                <a href={`/groups/${eventGroup?.id}`}>From Group: {eventGroup?.name}</a>
            </div>
            <div className="allNav">
                <div className="bottomNavEvent">
                    <img src={event?.background_img} style={{ width: '700px', height: '500px' }} />
                    <p className="descriptionBox">{`Description: ${event?.description}`}</p>
                    <p>{`Location: ${event?.location}`}</p>
                    <motion.button whileHover={{scale: 1.1}} whileTap={{scale: .9}}
                        style={{ visibility: canEdit ? 'visible' : 'hidden' }}
                        onClick={() => {
                            dispatch(eventActions.deleteEventThunk(id));
                            history.push('/events')
                        }}
                    >
                        DELETE
                    </motion.button >
                    <motion.button whileHover={{scale: 1.1}} whileTap={{scale: .9}}
                        style={{ visibility: canEdit ? 'visible' : 'hidden' }}
                        onClick={() => setShowEditForm(true)}
                    >
                        EDIT</motion.button >
                    {showEditForm && content}
                </div>
                <div className='attendeesCards'>
                    <ul>
                        <div className='attendee-header'>
                        <h1 className='attendeeHeader'>Attendees({attendeeList.length})</h1>
                        {joinedEvent
                            ? <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: .9 }} style={{ visibility: visibility ? 'visible' : 'hidden', backgroundColor: "#ff5607", border: "none", borderRadius: '20px', height: '2.3rem', width: '4rem', color: 'white' }} onClick={() => {
                                dispatch(usersAttendingActions.leavingEventThunk(id, user))
                                setJoinedEvent(false)
                            }}>LEAVE </motion.button >
                            : <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: .9 }} style={{ visibility: visibility ? 'visible' : 'hidden', backgroundColor: "#ff5607", border: "none", borderRadius: '20px', height: '2.3rem', width: '4rem', color: 'white' }} onClick={() => {
                                dispatch(usersAttendingActions.joiningEventThunk(id, user))
                                setJoinedEvent(true)
                            }}>JOIN</motion.button >
                        }
                        </div>
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
            </div>
        </>
    );
};

export default SingleEvent;
