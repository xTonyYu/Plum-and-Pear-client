const ADD_ITEM = 'ADD_ITEM'

const addItemToCart = function addItemToCart(item) {
  return {
    type: ADD_ITEM,
    item: {
      item,
      numItems: 1,
    }
  }
}