const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'

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
  console.log("Redux in cartActions - removeItemFromCart...")
  return {
    type: REMOVE_ITEM,
    item: {
      item,
      numItems: -1,
    }
  }
}

export { addItemToCart, removeItemFromCart }