import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import * as groupActions from '../../store/groups'
import * as eventActions from '../../store/events';
import * as userEventsActions from '../../store/users-in-event'

export const UserProfile = () => {
    const { id } = useParams
    const history = useHistory()
    const dispatch = useDispatch()



    useEffect(async () => {
        await dispatch(groupActions.loadAllGroupsThunk())
        await dispatch(eventActions.getAllEventsThunk())
    }, [dispatch])

    const sessionUser = useSelector(state => state.session.user)

    const groups = useSelector(state => Object.values(state.groups))

    const events = useSelector(state => Object.values(state.events))

    // events.forEach((event) => {
    //     dispatch(userEventsActions.usersAttendingThunk(event.id))
    // })



    const myCreatedGroups = groups.filter(group => group.owner_id === +sessionUser.id)


    const myCreatedEvents = events.filter(event => event.owner_id === +sessionUser.id)


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
                    {/* {myCreatedEvents.map((event, idx) => (
                        <p>{event.title}</p>
                    ))} */}
                </div>



                <div>
                    <h1>Upcoming Events</h1>
                    {/* {myCreatedEvents.map((event, idx) => (
                        <p>{event.title}</p>
                    ))} */}
                </div>


            </div>
        </>
    )
}
