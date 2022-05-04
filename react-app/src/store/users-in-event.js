const GET_USERS = "event/GET_USERS";
const JOIN_EVENT = 'event/JOIN_EVENT'


const getUsers = (users) => ({
    type: GET_USERS,
    users,
});

const joinEvent = user => ({
    type: JOIN_EVENT,
    user
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
    console.log(id, user, '<--');
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


const usersEventsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USERS:
            const allUsers = {};
            action.users.users.forEach((user) => {
                allUsers[user.id] = user;
            });
            return { ...allUsers, ...state };
        case JOIN_EVENT:
            const joinedUsers = {...state};
            return { ...joinedUsers, ...action.user.user}
        default:
            return state;
    }
};

export default usersEventsReducer
