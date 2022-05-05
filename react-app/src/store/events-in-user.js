const GET_EVENTS = "event/GET_EVENTS";
const GET_FILTERED_EVENT = "calendar/GET_EVENT"


const loadUserEvents = events => ({
    type: GET_EVENTS,
    events
})




export const getEvent = events => ({
    type: GET_FILTERED_EVENT,
    events
})



export const filterEventThunk = (date, id) => async dispatch => {
    const res = await fetch(`/api/users/${id}/calendar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(date)
    })

    if (res.ok) {
        const events = await res.json()
        console.log(events)
        dispatch(getEvent(events))
    }
}


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

        case GET_FILTERED_EVENT:
            const filtered = {}
            // console.log(action.events.event, "==========>")
            action.events.event.forEach(event => {
                filtered[event.id] = event
            });
            return { ...state, ...filtered }
        default:
            return state
    }
}

export default userEventsReducer
