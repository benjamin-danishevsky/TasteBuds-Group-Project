const GET_EVENTS = 'events/GET_EVENTS'
const SINGLE_EVENT = 'events/SINGLE_EVENT'
const CREATE_EVENT = 'events/CREATE_EVENT'


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

    if (res.ok) {
        const newEvent = await res.json();
        dispatch(createEvent(newEvent))
    }
}


const eventsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_EVENTS:
            const allEvents = {};

            // console.log('Get Events action', typeof(action.events), action.events)


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
            if(!state[action.event.id]) {
                const newState = {
                    ...state,
                    [action.event.id]: action.event
                }
                return newState;
            }
            return {
                ...state,
                [action.event.id]: {
                    ...state[action.event.id],
                    ...action.event
                }
            }
        default:
            return state
    }
}

export default eventsReducer
