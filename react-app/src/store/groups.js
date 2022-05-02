// import { csrfFetch } from "./csrf";

const LOAD = '/groups/LOAD'

export const load = groups => ({
  type: LOAD,
  groups
})

export const loadAllGroups = () => async dispatch => {
  const result = await fetch('/api/groups/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if(result.ok) {
    const groups = await result.json();
    dispatch(load(groups))
    return result
  }
}

const initialState = {
  groups: []
}

const groupReducer = (state = initialState, action) => {
  // let newState = {...state}
  switch (action.type) {
    case LOAD:
      const allGroups = {};
      console.log(action.groups)
      action.groups.groups.forEach(group => {
        allGroups[group.id] = group
      });
      return {
        ...allGroups,
        ...state.group,
      };
      default:
        return state;
  }
}

export default groupReducer;
