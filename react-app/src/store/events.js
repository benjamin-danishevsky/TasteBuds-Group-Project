const GET_EVENTS = 'events/GET_EVENTS'
const SINGLE_EVENT = 'events/SINGLE_EVENT'

const getEvents = events => ({
    type: GET_EVENTS,
    events
})

const getOneEvent = event => ({
    type: SINGLE_EVENT,
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
        default:
            return state
    }
}

export default eventsReducer
