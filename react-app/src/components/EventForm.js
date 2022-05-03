import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as eventActions from '../store/events';

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


    if(!sessionUser) {
        history.push(`/groups/${id}`)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const payload = {
            title,
            description,
            location,
            date,
            background_img,
            owner_id: sessionUser.id,
            group_id: id
        }

        const createdEvent = await dispatch(eventActions.createEventThunk(id, payload));

        if(createdEvent) {
            history.push(`/events/${createdEvent.event.event.id}`)
        }
    }

    console.log('events', events)

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type='input'
                    placeholder='title'
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    type='input'
                    placeholder='description'
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}

                />
                <input
                    type='input'
                    placeholder='location'
                    required
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                />
                <input
                    type='input'
                    placeholder='date'
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
                <input
                    type='input'
                    placeholder='Image'
                    required
                    value={background_img}
                    onChange={e => setBackground_img(e.target.value)}
                />
                <button>Create New Event</button>
            </form>
        </div>
    )
}

export default EventForm
