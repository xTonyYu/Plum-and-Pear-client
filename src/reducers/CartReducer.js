// TODO default state below need to reflect what is currently in cart DB; need to linked it when customer logged in and get want is in the user's cart data
const defaultState = {
  numItems: 0,
  items: []
}

function cart(state=defaultState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case 'ADD_ITEM':
      newState.numItems += action.item.numItems
      newState.items = [...state.items , action.item.item]
      return newState
    case 'REMOVE_ITEM':
      newState.numItems += action.item.numItems
      newState.items = [...state.items , action.item.item]
      return newState
    case 'UPDATE_NUMITEMS':
      newState.numItems = action.item.numItems
      // newState.items = [...state.items , action.item.item]
      return newState
    default:
      return state
  }
}

export default cart