// import { csrfFetch } from "./csrf";

const LOAD = 'groups/LOAD';
const LOAD_ONE_GROUP = 'groups/LOAD_ONE_GROUP';
const DELETE_ONE_GROUP = 'groups/DELETE_ONE_GROUP';
const EDIT_ONE_GROUP = 'groups/EDIT_ONE_GROUP';

export const load = groups => ({
  type: LOAD,
  groups
})

export const loadOneGroup = group => ({
  type: LOAD_ONE_GROUP,
  group
});

export const deleteOneGroup = group => ({
  type: DELETE_ONE_GROUP,
  group
});

export const editOneGroup = group => ({
  type: EDIT_ONE_GROUP,
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

export const loadGroup = id => async dispatch => {
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

export const deleteGroupThunk = id => async dispatch => {
  const response = await fetch(`/api/groups/${id}`, {
    method: "DELETE",
  });
  if(response.ok) {
    dispatch(deleteOneGroup(id))
  }
};

export const editGroupThunk = (id, payload) => async dispatch => {
  const response = await fetch(`/api/groups/${id}/edit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if(response.ok) {
    const editedGroup = await response.json();
    return dispatch(editOneGroup(editedGroup));
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
    case EDIT_ONE_GROUP:
      return {
        ...state,
        [action.group.id]: action.group
      };
      case DELETE_ONE_GROUP:
        const deletedState = {...state};
        delete deletedState[action.group];
        return deletedState
      default:
        return state;
  }
}

export default groupReducer;
