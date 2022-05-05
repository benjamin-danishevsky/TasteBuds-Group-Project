import React from "react";
import { useState, useEffect } from "react";
import { filterEventThunk } from "../../store/events-in-user";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const ShowCalendar = ({ setSubmit, allEvents }) => {
    // user id
    const { id } = useParams()

    const [date, setDate] = useState()
    const dispatch = useDispatch()



    console.log(allEvents, 'all events prop')

    let filteredEvents;
    const handleSubmit = async (e) => {
        e.preventDefault()

        const formatDate = date.split('T').join(' ') + ':00'


        const payload = {
            datetime: formatDate
        }

        console.log(payload, '<- payload going into thunk')

        filteredEvents = await dispatch(filterEventThunk(payload, id))
        setSubmit(true)
    }

    const eventsFromThunk = useSelector(state => Object.values(state.usersEvents))


    console.log(eventsFromThunk, '<- filtered events from thunk')

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                    <button>SEARCH</button>
                </form>
            </div>

            {eventsFromThunk?.map(event => (
                <a href={`/events/${event.id}`}>
                    <img src={event.background_img} style={{width:300, height:200}}/>
                    <p>{event.title}</p>
                    <p>{event.location}</p>
                </a>
            ))}
        </>
    )
}
