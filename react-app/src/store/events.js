const GET_EVENTS = 'events/GET_EVENTS'


const getEvents = events => ({
    type: GET_EVENTS,
    events
})


export const getAllEventsThunk = () => async dispatch => {
    const res = await fetch('/api/events/');

    if (res.ok) {
        const events = await res.json()
        console.log('Thunk Events =>', events)
        dispatch(getEvents(events))
    }
}


const eventsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_EVENTS:
            const allEvents = {};

            console.log('Get Events action', typeof(action.events), action.events)

            // action.events.forEach(event => {
            //     allEvents[event.id] = event
            // })
            return {
                ...allEvents,
                ...state
            }
        default:
            return state
    }
}

export default eventsReducer
