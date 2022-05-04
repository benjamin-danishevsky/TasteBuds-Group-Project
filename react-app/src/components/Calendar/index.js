import React from "react";
import { useState, useEffect } from "react";
import { filterEventThunk } from "../../store/calendar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const ShowCalendar = () => {

    const { id } = useParams()
    const [date, setDate] = useState()
    const dispatch = useDispatch()
    const events = useSelector(state => state.calendar)
    console.log(events, "SELECTED EVENTS")
    const selectedEvent = Object.values(events)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const formatDate = date.split('T').join(' ') + ':00'

        const payload = {
            datetime: formatDate
        }

        await dispatch(filterEventThunk(payload, id))
    }

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

            {selectedEvent?.map(event => (
                <a href={`/events/${event.id}`}>
                    <img src={event.background_img} style={{width:300, height:200}}/>
                    <p>{event.title}</p>
                    <p>{event.location}</p>
                </a>
            ))}
        </>
    )
}
