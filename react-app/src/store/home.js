// const LOAD = '/home/LOAD';

// export const loadUser = id => ({
//   type: LOAD,
//   id
// })


// export const loadHome = id => async dispatch => {
//   const result = await fetch(`/api/home/${id}`, {
//     headers:{
//     'Content-Type': 'application/json'
//     }
//   })
//   if (result.ok) {
//     const data = await result.json();
//     dispatch(loadUser(data));
//   }
// }


// const initialState = {}

// const homeReducer = (state = initialState, action) => {
//   switch(action.type) {
//     case LOAD:
//       const newState = {}
//       newState[action.user.user.id] = action.user.user
//       return{
//         ...state, ...newState
//       }
//     default:
//       return state
//   }
// }



// export default homeReducer;
