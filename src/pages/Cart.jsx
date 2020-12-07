import React from 'react'
import { connect } from 'react-redux'
import UserModel from '../models/user'
import CartItemSummarized from '../components/CartItemSummarized/CartItemSummarized'
import '../App.css'
import CartItemModel from '../models/cartitem'
import ProductModel from '../models/product'
import { addItemToCart, removeItemFromCart } from '../actions/cartActions'

class Cart extends React.Component {
  state = {
    // products: [],
    userInfo: {},
    cartitems: [],
  }

  componentDidMount() {
    let foundUserJson = localStorage.getItem('foundUser')
    let foundUser = JSON.parse(foundUserJson)
    this.setState({userInfo: foundUser})
    const id = this.state.userInfo._id || this.props.userInfo._iid || foundUser._id
    this.getUserById(id)
  }

  getUserById(id) {
    UserModel.getUserById(id)
    .then(res => {
      this.setState({userInfo: res.data, cartitems: res.data.cart})
      localStorage.setItem('foundUser', JSON.stringify(res.data))
    })
  }
  
  increaseCartItem = (cartItem) => {
    let totPriceChg = cartItem.product.price
    let totQtyChg = 1
    this.props.addItemToCart(cartItem)
    this.updateCartItemQty(cartItem, totPriceChg, totQtyChg)
  }
  
  reduceCartItem = (cartItem) => {
    let totPriceChg = -(cartItem.product.price)
    let totQtyChg = -1
    this.props.removeItemFromCart(cartItem)
    if (cartItem.totQty + totQtyChg === 0) {
      // remove item from cart
      CartItemModel.remove(cartItem._id)
      .then(res => console.log(res.data))
      // remove item from user's cart list
      let user = this.state.userInfo
      const index = user.cart.findIndex(item => item._id === cartItem._id)
      if (index >= 0) user.cart.splice(index, 1)
      UserModel.editUser(user._id, user)
      .then(res => {
        const updateUserInfo = res.data  // res.data would already have the changes
        this.setState({userInfo: updateUserInfo, cartitems: updateUserInfo.cart})
        localStorage.setItem('foundUser', JSON.stringify(updateUserInfo))
      })
      .catch (err => console.log('err updaing user cart...', err))
  } else {
      this.updateCartItemQty(cartItem, totPriceChg, totQtyChg)
    }
  }
  
  updateCartItemQty = (cartItem, totPriceChg, totQtyChg) => {
    const userid = this.state.userInfo._id
    let cartItemData = {
      status: 'in cart',
      totPrice: cartItem.totPrice + totPriceChg,
      totQty: cartItem.totQty + totQtyChg,
      product: cartItem.product._id,
      userid: userid,
    }
    CartItemModel.edit(cartItem._id, cartItemData)
    .then(item => {
      // get updated user info after adding cart item
      UserModel.getUserById(userid)
      .then(res => {
        const updateUserInfo = res.data  // res.data would already have the changes
        this.setState({userInfo: updateUserInfo, cartitems: updateUserInfo.cart})
        localStorage.setItem('foundUser', JSON.stringify(updateUserInfo))
      })
    })
    .catch (err => console.log('err adding cart item...', err))
  }

  buyItemsInCart = () => {
    const userid = this.state.userInfo._id
    this.state.cartitems.forEach(item => {
      // change status of corresponding items in the CartModel
        item.status = 'bought'
        CartItemModel.edit(item._id, item)
        .catch(err => console.log('err updating cart to bought...', err))
      // reduce qty in Product Model based on cart items and qty
        let prod = item.product
        prod.quantity -= item.totQty
        ProductModel.editProduct(item.product._id, prod)
        .catch(err => console.log('err updating product qty...', err))
    })
    
    // remove all items in user's cart
    let emptyingCart = this.state.userInfo
    emptyingCart.cart = []
    UserModel.editUser(userid, emptyingCart)
    .then(res => {
      const updateUserInfo = res.data  // res.data would already have the changes
      this.setState({userInfo: updateUserInfo, cartitems: updateUserInfo.cart})
      localStorage.setItem('foundUser', JSON.stringify(updateUserInfo))
    })
    .catch (err => console.log('err emptying user cart...', err))
  }
  
  render() {
    return (
      <>
        <section className="products">
          <div className="title">
              <div className="cart-wrapper ind-name border">
                  <h2>Your Shopping Cart</h2>
                  <CartItemSummarized userInfo={this.state.userInfo} cart={this.state.cartitems} currentUser={this.props.currentUser} reduceCartItem={this.reduceCartItem} increaseCartItem={this.increaseCartItem} buyItemsInCart={this.buyItemsInCart} />
              </div>
          </div>

        </section>
        </>
    )
  }
}

// export default Cart;
function mapStateToProps(state) {
  return {
    numItems: state.cart.numItems,
    items: state.cart.items,
    stateCart: state.cart,
  }
}
export default connect(mapStateToProps, { addItemToCart, removeItemFromCart } )(Cart);