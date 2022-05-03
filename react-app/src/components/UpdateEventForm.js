import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as eventActions from '../store/events';

const UpdateEventForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {id} = useParams()

    const sessionUser = useSelector(state => state.session.user);

    const events = useSelector(state => state.events)
    console.log(events[id])


    const [title, setTitle] = useState(events[id]?.title)
    const [description, setDescription] = useState(events[id]?.description)
    const [location, setLocation] = useState(events[id]?.location)
    const [date, setDate] = useState(events[id]?.date)
    const [background_img, setBackground_img] = useState(events[id]?.background_img)
    useEffect(async () => {
        await dispatch(eventActions.getAllEventsThunk())
    }, [dispatch])


    if(!sessionUser) {
        history.push(`/`)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const payload = {
            title,
            description,
            location,
            date,
            background_img,
        }

        const updatedEvent = await dispatch(eventActions.updateEventThunk(id, payload));

        if(updatedEvent) {
            history.push(`/events/${updatedEvent.event.event.id}`)
        }
    }



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
                <button>Edit Event</button>
            </form>
        </div>
    )
}

export default UpdateEventForm
