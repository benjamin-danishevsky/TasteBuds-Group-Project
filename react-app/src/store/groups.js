// import { csrfFetch } from "./csrf";

const LOAD = '/groups/LOAD'
const LOAD_ONE_GROUP = '/groups/LOAD_ONE_GROUP'

export const load = groups => ({
  type: LOAD,
  groups
})

export const loadOneGroup = group => ({
  type: LOAD_ONE_GROUP,
  group
});

export const loadAllGroups = () => async dispatch => {
  const result = await fetch('/api/groups/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if(result.ok) {
    const groups = await result.json();
    dispatch(load(groups))
    return result;
  }
}

export const loadGroup = groupId => async dispatch => {
  const result = await fetch(`/api/groups/${groupId}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if(result.ok) {
    const group = await result.json();
    dispatch(loadOneGroup(group));
  }
}

const initialState = {
  groups: []
}

const groupReducer = (state = initialState, action) => {
  let newState = {...state}
  switch (action.type) {
    case LOAD_ONE_GROUP:
      newState[action.group.group] = action.group.group;
      return newState
    case LOAD:
      const allGroups = {};
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
