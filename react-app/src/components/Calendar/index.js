import React from "react";
import { useState, useEffect } from "react";
import { filterEventThunk, loadUserEventsThunk } from "../../store/events-in-user";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from 'framer-motion'
import './calendar.css'


export const ShowCalendar = ({ setSubmit, allEvents }) => {
    // user id
    const { id } = useParams()
    const [errors, setErrors] = useState([])
    const [date, setDate] = useState()
    const dispatch = useDispatch()




    let filteredEvents;
    const handleSubmit = async (e) => {
        e.preventDefault()



        if (typeof (date) != String && !date) {
            const errors = []
            errors.push('Please enter a valid date')
            setErrors(errors)
            return
        }
        setErrors([])
        const formatDate = date.split('T').join(' ') + ':00'


        const payload = {
            datetime: formatDate
        }


        filteredEvents = await dispatch(filterEventThunk(payload, id))
        setSubmit(true)
    }

    const eventsFromThunk = useSelector(state => Object.values(state.usersEvents))



    return (
        <>
            <div>
                <form className='calendar' onSubmit={handleSubmit}>
                    {errors && errors.map((error) => (
                        <li className='error' key={error} style={{ color: 'red' }}>{error}</li>
                    ))}
                    <input
                        style={{ border: 'lightgray', width: 'fit-content' }}
                        type="datetime-local"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                    <motion.button
                        // style={{transform: 'translate(-88px, 33.5px)'}}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >Select Date</motion.button>

                    <motion.button
                        onClick={() => dispatch(loadUserEventsThunk(id))}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: .9 }}
                    >Clear Filter</motion.button>
                </form>
            </div>
            <div className='calendarRes'>
                {eventsFromThunk?.map(event => (
                    <a href={`/events/${event.id}`}>
                        <p className="calContent">{event.title}</p>
                        <img src={event.background_img} style={{ width: 300, height: 200 }} className="calendarImg" />
                        {/* <p>{event.location}</p> */}
                    </a>
                ))}
            </div>
        </>
    )
}
