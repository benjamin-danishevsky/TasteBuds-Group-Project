import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as eventActions from "../store/events";
import UpdateEventForm from "./UpdateEventForm"

const SingleEvent = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const [users, setUsers] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);

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
        </>
    );
};

export default SingleEvent;
