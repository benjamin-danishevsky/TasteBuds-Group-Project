const GET_EVENTS = 'events/GET_EVENTS'
const SINGLE_EVENT = 'events/SINGLE_EVENT'
const CREATE_EVENT = 'events/CREATE_EVENT'
const DELETE_EVENT = 'events/DELETE_EVENT'
const UPDATE_EVENT = 'events/UPDATE_EVENT'


const getEvents = events => ({
    type: GET_EVENTS,
    events
})

const getOneEvent = event => ({
    type: SINGLE_EVENT,
    event
})


const createEvent = event => ({
    type: CREATE_EVENT,
    event
})

const deleteEvent = id => ({
    type: DELETE_EVENT,
    id
})

const updateEvent = event => ({
    type: UPDATE_EVENT,
    event
})

export const getAllEventsThunk = () => async dispatch => {
    const res = await fetch('/api/events/', {
        headers: {
          'Content-Type': 'application/json'
        }
      });

    if (res.ok) {
        const events = await res.json()
        dispatch(getEvents(events))
    }
}

export const getSingleEventThunk = (id) => async dispatch => {
    const res = await fetch(`/api/events/${id}`,
       { headers: {
            'Content-Type': 'application/json'
        }}
    );
    if (res.ok){
        const event = await res.json();
        dispatch(getOneEvent(event))
    }
}

export const createEventThunk = (id, payload) => async dispatch => {
    const res = await fetch(`/api/groups/${id}/new-event`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    // console.log(res);

    if (res.ok) {
        const newEvent = await res.json();

        // console.log('New Event after res.json()', newEvent)

        return dispatch(createEvent(newEvent))
    }
}

export const updateEventThunk = (id, event) => async dispatch => {
    const res = await fetch(`/api/events/${id}/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })

    if(res.ok){
        const updatedEvent = await res.json();
        console.log(updatedEvent);
        return dispatch(updateEvent(updatedEvent))
    }
}

export const deleteEventThunk = (id) => async dispatch => {
    const res = await fetch(`/api/events/${id}`, {
        method: 'DELETE'
    })
    if (res.ok){

        return dispatch(deleteEvent(id))
    }
}


const eventsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_EVENTS:
            const allEvents = {};
            action.events.events.forEach(event => {
                allEvents[event.id] = event
            })
            return {
                ...allEvents,
                ...state
            }
        case SINGLE_EVENT:
            const newEvent = {};
            newEvent[action.event.event.id] = action.event.event;
            return {...state, ...newEvent}

        case CREATE_EVENT:
            console.log("Action event", action.event.event.id)
            if(!state[action.event.event.id]) {
                const newState = {
                    ...state,
                    [action.event.event.id]: action.event.event
                }
                return newState;
            }
            return {
                ...state,
                [action.event.event.id]: {
                    ...state[action.event.event.id],
                    ...action.event.event
                }
            }
        case DELETE_EVENT:
            const newState = {...state}
            delete newState[action.id]
            return newState;

        case UPDATE_EVENT:
            const updateState = {...state}
            updateState[action.event.id] = action.event
            return updateState;
        default:
            return state
    }
}

export default eventsReducer
