const GET_EVENTS = "event/GET_EVENTS";


const loadUserEvents = events => ({
    type: GET_EVENTS,
    events
})


export const loadUserEventsThunk = id => async dispatch => {
    const res = await fetch(`/api/users/${id}/join`, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    if(res.ok) {
        const events = await res.json()
        dispatch(loadUserEvents(events))
    }
}

const userEventsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_EVENTS:
            const allEvents = {}
            action.events.events.forEach(event => {
                allEvents[event.id] = event
            })
            return { ...allEvents, ...state}
        default:
            return state
    }
}

export default userEventsReducer
