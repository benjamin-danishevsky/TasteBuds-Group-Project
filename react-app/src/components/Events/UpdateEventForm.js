import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as eventActions from '../../store/events';

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
    const [errors, setErrors] = useState([]);

    if(!sessionUser) {
        history.push(`/`)
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
        }

        dispatch(eventActions.updateEventThunk(id, payload));

        hideForm()
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <ul className="update-event-errors-list">
                    {errors && errors.map((error) => (
                        <li className='error'key={error} style={{color: 'red'}}>{error}</li>
                    ))}
                </ul>
                <input
                    type='input'
                    placeholder='title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    type='input'
                    placeholder='description'
                    value={description}
                    onChange={e => setDescription(e.target.value)}

                />
                <input
                    type='input'
                    placeholder='location'
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                />
                <input
                    type='datetime-local'
                    placeholder='date'
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
                <input
                    type='input'
                    placeholder='Image'
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
