const GET_USERS = 'groups/GET_USERS'
const JOIN_GROUP = 'groups/JOIN_GROUP';
const LEAVE_GROUP = 'groups/LEAVE_GROUP'


const loadUsers = users => ({
  type: GET_USERS,
  users
})

const joinGroup = user => ({
  type: JOIN_GROUP,
  user
})

const leaveGroup = id => ({
  type: LEAVE_GROUP,
  id
})

export const usersInGroupsThunk = id => async dispatch => {
  const result = await fetch(`/api/groups/${id}/groups`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if(result.ok) {
    const users = await result.json();
    return dispatch(loadUsers(users));
  }
}

export const joinGroupThunk = (id, user) => async dispatch => {
  const result = await fetch(`/api/groups/${id}/groups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  })
  if (result.ok) {
    const joinedUser = await result.json()
    dispatch(joinGroup(joinedUser))
  }
}

export const leaveGroupThunk = (id, user) => async dispatch => {
  const result = await fetch(`/api/groups/${id}/groups`, {
    method: 'DELETE',
    body: JSON.stringify(user)
  })
  if(result.ok) {
    const leavingUser = await result.json()
    dispatch(leaveGroup(leavingUser))
  }
}

const initialState = {}

const usersJoinGroupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      const allUsers = {}
      console.log(action.users, '102312301023010203002030102301203')
      action.users.users.forEach(user => {
        allUsers[user.id] = user
      })
      return { ...allUsers, ...state }
    case JOIN_GROUP:
      if(!state[action.user.id]) {
        const newState = {
          ...state,
          [action.user.id]: action.user
        }
        return newState
      }
      return {
        ...state,
        [action.user.id]: {
          ...state[action.user.id],
          ...action.user
        }
      }
    case LEAVE_GROUP:
      const newState = { ...state }
      delete newState[action.id.user.id];
      return newState
    default:
      return state
  }
}

export default usersJoinGroupsReducer;
