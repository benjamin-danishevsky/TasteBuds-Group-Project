const GET_EVENT = "calendar/GET_EVENT"



export const getEvent = events => ({
    type: GET_EVENT,
    events
})



export const filterEventThunk = (date, id) => async dispatch => {
    const res = await fetch(`/api/groups/${id}/calendar`, {
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
            // console.log(action.events.event, "==========>")
            action.events.event.forEach(event => {
                allEvents[event.id] = event
            });
            return { ...state, ...allEvents }
        default:
            return state
    }
}

export default calendarReducer;