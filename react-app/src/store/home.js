const LOAD = '/home/LOAD';

export const load = id => ({
  type: LOAD,
  id
})

// export const loadHome = id => async dispatch => {
//   const result = await fetch(`/api/home/${id}`, {

//   })
// }
