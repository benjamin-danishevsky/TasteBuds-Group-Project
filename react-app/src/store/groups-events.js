const LOAD_EVENTS = 'groups/LOAD_EVENTS'

const loadEvents = event => ({
  type: LOAD_EVENTS,
  event
})

export const loadAllEventsThunk = (id) => async dispatch => {
  const result = await fetch(`/api/groups/${id}/events`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if(result.ok) {
    const events = await result.json();
    return dispatch(loadEvents(events))
  }
}

const  initialState = {}

const groupsJoinEventsReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_EVENTS:
      const newState = {}
      action.event.events.forEach(event => {
        newState[event.id] = event
      });
      return {
        ...newState,
        ...state
      }
      default:
        return state;
  }
}

export default groupsJoinEventsReducer
