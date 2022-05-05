const GET_EVENT = "calendar/GET_EVENT"



export const getEvent = events => ({
    type: GET_EVENT,
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


const calendarReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_EVENT:
            const allEvents = {}

            if(action.events.event) {
                action.events.event.forEach(event => {
                    allEvents[event.id] = event
                });
            } else {
                return { ...allEvents }
            }
            // console.log('right before return ==>', { ...allEvents})
            return { ...state, ...allEvents }
        default:
            return state
    }
}

export default calendarReducer;
