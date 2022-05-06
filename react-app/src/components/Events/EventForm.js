import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as eventActions from '../../store/events'
import './EventForm.css'

const EventForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {id} = useParams()

    const sessionUser = useSelector(state => state.session.user);
    const events = useSelector(state => state.events)

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [location, setLocation] = useState()
    const [date, setDate] = useState()
    const [background_img, setBackground_img] = useState()
    const [errors, setErrors] = useState([]);


    if(!sessionUser) {
        history.push(`/groups/${id}`)
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const validateErrors = [];
        if(!title) validateErrors.push('Event title is required.');
        else if(title.length < 3) validateErrors.push('Event title must be at least 3 characters.')
        else if(title.length > 50) validateErrors.push('Event title must be no more than 50 characters')

        if(!description) validateErrors.push('Event description is required.');
        else if(description.length < 5) validateErrors.push('Event description must be at least 5 characters.')

        if(!location) validateErrors.push('Event location is required.')
        else if(location.length > 100) validateErrors.push('Event location must be less than 100 characters');
        if(!date) validateErrors.push('Event date is required.');
        if(!background_img) validateErrors.push('Event image is required.')
        if(validateErrors.length > 0){
            setErrors(validateErrors);
            return
        }

        const formatDate = date.split('T').join(' ')+':00'
        const payload = {
            title,
            description,
            location,
            date: formatDate,
            background_img,
            owner_id: sessionUser.id,
            group_id: id
        }

        const createdEvent = await dispatch(eventActions.createEventThunk(id, payload));

        if(createdEvent) {
            history.push(`/events/${createdEvent.event.event.id}`)
        }
    }



    return (
        <div className = "eventForm-div">
            <form onSubmit={handleSubmit}>
                <ul className="create-event-errors-list">
                    {errors && errors.map((error) => (
                        <li className='error'key={error} style={{color: 'red'}}>{error}</li>
                    ))}
                </ul>
                <h1>Create a new Event</h1>
                <div>
                <input
                    type='input'
                    placeholder='title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                </div>
                <div>
                <input
                    type='input'
                    placeholder='description'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                </div>
                <div>
                <input
                    type='input'
                    placeholder='location'
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                />
                </div>
                <div>
                <input
                    type='datetime-local'
                    placeholder='date'
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
                </div>
                <div>
                <input
                    type='input'
                    placeholder='Image'
                    value={background_img}
                    onChange={e => setBackground_img(e.target.value)}
                />
                </div>
                <div>
                <button>Create New Event</button>
                </div>
            </form>
        </div>
    )
}

export default EventForm
