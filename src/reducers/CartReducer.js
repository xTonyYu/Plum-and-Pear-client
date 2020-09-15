const defaultState = {
  numItems: 0,
  items: []
}

function cart(state=defaultState, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      // TODO: need to test below
      const newState = state;
      newState.numItems += action.item.numItems
      newState.items = [...state.items , action.item.item]
      console.log(newState)
      return newState
    default:
      return state
  }
}

export default cart