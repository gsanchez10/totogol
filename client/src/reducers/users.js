export default function(state = [], action) {
  switch (action.type) {
    case 'GET_PLAYERS':
      return action.payload
  }

  return state;
}