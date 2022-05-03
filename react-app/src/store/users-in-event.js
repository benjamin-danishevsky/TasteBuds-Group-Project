const GET_USERS = "event/GET_USERS";


const getUsers = (users) => ({
    type: GET_USERS,
    users,
});

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


const usersEventsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USERS:
            const allUsers = {};
            action.users.users.forEach((user) => {
                allUsers[user.id] = user;
            });
            return { ...allUsers, ...state };
        default:
            return state;
    }
};

export default usersEventsReducer
