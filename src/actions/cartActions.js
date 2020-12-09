const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const UPDATE_NUMITEMS = 'UPDATE_NUMITEMS'

const addItemToCart = function addItemToCart(item) {
  console.log("Redux in cartActions - addItemToCart...")
  return {
    type: ADD_ITEM,
    item: {
      item,
      numItems: 1,
    }
  }
}
const removeItemFromCart = function removeItemFromCart(item) {
  return {
    type: REMOVE_ITEM,
    item: {
      item,
      numItems: -1,
    }
  }
}
const updateNumItemsInCart = function updateNumItemsInCart(numItems) {
  return {
    type: UPDATE_NUMITEMS,
    item: {
      numItems,
    }
  }
}

export { addItemToCart, removeItemFromCart, updateNumItemsInCart }