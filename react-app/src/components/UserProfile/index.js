import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import * as groupActions from '../../store/groups'
import * as eventActions from '../../store/events';
// import * as userEventsActions from '../../store/users-in-event'
import * as userEventActions from '../../store/events-in-user'
import * as userGroupActions from '../../store/groups-in-users'
import {ShowCalendar} from '../Calendar'
import {motion} from 'framer-motion'

export const UserProfile = () => {
    // current user id
    const { id } = useParams()

    const history = useHistory()

    const dispatch = useDispatch()

    const [submit, setSubmit] = useState(false)

    const events = useSelector(state => state.events)
    const eventsArr = Object.values(events)
    const eventsInUser = useSelector(state => state.usersEvents)

    const groupsInUser = useSelector(state => state.usersGroups)


    const allEvents = Object.values(eventsInUser)
    const allGroups = Object.values(groupsInUser)

    console.log(allEvents, '<---')

    useEffect(async () => {

        await dispatch(groupActions.loadAllGroupsThunk())
        await dispatch(eventActions.getAllEventsThunk())
        await dispatch(userEventActions.loadUserEventsThunk(id))
        await dispatch(userGroupActions.usersGroupsThunk(id))

    }, [dispatch])






    const sessionUser = useSelector(state => state.session.user)

    if(!sessionUser) {
        history.push('/forbidden')
    }

    const groups = useSelector(state => Object.values(state.groups))


    const myCreatedGroups = groups.filter(group => group.owner_id === +sessionUser.id)


    const myCreatedEvents = eventsArr.filter(event => event.owner_id === +sessionUser.id)



    return (
        <>
            <div>
                <h2>THIS IS MY USER PROFILE</h2>
                {/* <p>Total Groups: {`${myCreatedGroups.length}`}</p>
                <p>Total Events: {`${myCreatedEvents.length}`}</p> */}
                <div>
                    <h1>My Created Groups</h1>
                    {myCreatedGroups.map((group, idx) => (
                        <p>{group.name}</p>
                    ))}
                </div>


                <div>
                    <h1>My Created Events</h1>
                    {myCreatedEvents.map((event, idx) => (
                        <p>{event.title}</p>
                    ))}
                </div>


                <div>
                    <h1>Groups Joined</h1>
                    {allGroups.map((group, idx) => (
                        <p key={idx}>{group.name}</p>
                    ))}
                </div>



                <div>
                    <h1>Upcoming Events</h1>
                    <ShowCalendar setSubmit={setSubmit} allEvents={allEvents}/>
                    {/* {!submit && (allEvents.map((event, idx) => (
                        <p>{event.title}</p>
                    )))} */}

                </div>


            </div>
        </>
    )
}
