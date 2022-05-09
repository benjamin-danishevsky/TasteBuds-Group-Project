const GET_USERS = "event/GET_USERS";
const JOIN_EVENT = 'event/JOIN_EVENT'
const LEAVE_EVENT = 'event/LEAVE_EVENT'

const getUsers = (users) => ({
    type: GET_USERS,
    users,
});

const joinEvent = user => ({
    type: JOIN_EVENT,
    user
})

const leaveEvent = id => ({
    type: LEAVE_EVENT,
    id
})

export const usersAttendingThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/events/${id}/join`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.ok) {
        const users = await res.json();
        return dispatch(getUsers(users));
    }
};

export const joiningEventThunk = (id, user) => async dispatch => {
    const res = await fetch(`/api/events/${id}/join`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    if (res.ok){
        const joinedUser = await res.json();
        return dispatch(joinEvent(joinedUser))
    }
}

export const leavingEventThunk = (id, user) => async dispatch => {
    const res = await fetch(`/api/events/${id}/join`, {
        method: "DELETE",
        body: JSON.stringify(user)
    })

    if(res.ok) {
        const leftUser = await res.json()
        dispatch(leaveEvent(leftUser.user.id))
    }
}


const usersEventsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USERS:
            const allUsers = {};
            action.users.users.forEach((user) => {
                allUsers[user.id] = user;
            });
            return { ...allUsers, ...state };
        case JOIN_EVENT:
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

        case LEAVE_EVENT:
            const newState = { ...state }
            delete newState[action.id];
            return newState
        default:
            return state;
    }
};

export default usersEventsReducer
