import { combineReducers } from 'redux'
import cart from './CartReducer'

const rootReducer = combineReducers({
  cart
})

export default rootReducer;