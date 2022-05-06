const GET_GROUPS = 'event/GET_GROUPS'

const loadGroups = groups => ({
    type: GET_GROUPS,
    groups
})

export const usersGroupsThunk = id => async dispatch => {
    const res = await fetch(`/api/users/${id}/groups`, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    if(res.ok) {
        const groups = await res.json()
        dispatch(loadGroups(groups))
    }
}


const usersGroupsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_GROUPS:
            const allGroups = {}
            action.groups.groups.forEach(group => {
                allGroups[group.id] = group
            })
            return { ...allGroups, ...state }
        default:
            return state
    }
}

export default usersGroupsReducer;
