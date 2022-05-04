const SUBMIT_SEARCH = 'search/SUBMIT_SEARCH';

const submitSearch = events => ({
    type: SUBMIT_SEARCH,
    events
})

export const submitSearchThunk = (payload) => async dispatch => {
    const res = await fetch('/api/search/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const events = await res.json();
        dispatch(submitSearch(events))
    }
}

const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case SUBMIT_SEARCH:
            const searches = {...state}
            action.events.events.forEach(event => {
                searches[event.id] = event;
            })
            return {...searches, ...state}
        default:
            return state
    }
}

export default searchReducer
