import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as eventActions from '../store/events';

const UpdateEventForm = ({ hideForm}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {id} = useParams()

    const sessionUser = useSelector(state => state.session.user);
    const events = useSelector(state => state.events)

    useEffect(async () => {
        await dispatch(eventActions.getAllEventsThunk())
    }, [dispatch])


    const [title, setTitle] = useState(events[id]?.title)
    const [description, setDescription] = useState(events[id]?.description)
    const [location, setLocation] = useState(events[id]?.location)
    // date format: YYYY-MM-DD HH:mm:ss;
    // 2022-10-31 15:55:00
    const [date, setDate] = useState(events[id]?.date)
    const [background_img, setBackground_img] = useState(events[id]?.background_img)


    if(!sessionUser) {
        history.push(`/`)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const formatDate = date.split('T').join(' ')+':00'

        const payload = {
            title,
            description,
            location,
            date: formatDate,
            background_img,
        }

        dispatch(eventActions.updateEventThunk(id, payload));

        hideForm()
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
                    type='datetime-local'
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
                <button type='submit'>Update Event</button>
            </form>
            <button onClick={e => {
                e.preventDefault();
                hideForm()
            }}>Cancel</button>
        </div>
    )
}

export default UpdateEventForm
