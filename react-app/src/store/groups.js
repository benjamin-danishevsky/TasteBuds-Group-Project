// import { csrfFetch } from "./csrf";

const LOAD = 'groups/LOAD'
const LOAD_ONE_GROUP = 'groups/LOAD_ONE_GROUP'
const ADD_GROUP = 'groups/addGroup'


export const load = groups => ({
  type: LOAD,
  groups
})

export const loadOneGroup = group => ({
  type: LOAD_ONE_GROUP,
  group
});


export const addGroup = group => {
  return {
    type: ADD_GROUP,
    group
  }
}


export const loadAllGroupsThunk = () => async dispatch => {
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

export const loadGroupThunk = id => async dispatch => {
  const result = await fetch(`/api/groups/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if(result.ok) {
    const group = await result.json();
    dispatch(loadOneGroup(group));
  }
}



export const createGroupThunk = group => async dispatch =>{
      const res = await fetch(`/api/groups/new-group`, {
        method: 'POST',
        header: {
          'Accept': 'application/json',
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(group)
      })
      if(res.ok){
        const data = await res.json()
        dispatch(addGroup(data))
      }
}




const initialState = {}

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ONE_GROUP:
      const newState = {}
      newState[action.group.group.id] = action.group.group;
      return {
        ...state, ...newState
      };
    case LOAD:
      const allGroups = {};
      action.groups.groups.forEach(group => {
        allGroups[group.id] = group
      });
      return {
        ...state,
        ...allGroups
      };
    case ADD_GROUP:
      newState = { ...state, [action.group.group.id]: action.group.group}
      return newState
    default:
      return state;
  }
}

export default groupReducer;
