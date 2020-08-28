import React from 'react'
import UserModel from '../models/user'
import CartItemSummarized from '../components/CartItemSummarized/CartItemSummarized'
import '../App.css'
import CartItemModel from '../models/cartitem'

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
    this.getUserWithAttchment(id)
  }

  getUserWithAttchment(id) {
    UserModel.getUserWithAttchment(id)
    .then(res => {
      this.setState({userInfo: res.data, cartitems: res.data.cart})
      localStorage.setItem('foundUser', JSON.stringify(res.data))
    })
  }

  increaseCartItem = (prodname, price, prodimg, userid) => {
    // adding item to CartItem model
    let itemdata = {
      prodName: prodname,
      price: price,
      prodImg: prodimg,
      status: 'in cart',
      userid: userid,
    }
    console.log(itemdata)
    CartItemModel.add(itemdata)
    .then(res => {
      console.log(res.data);
      // get updated user info after adding cart item
      UserModel.getUserById(userid)
      .then(res => {
        const updateUserInfo = res.data  // res.data would already have the changes
        this.setState({userInfo: updateUserInfo, cartitems: res.data.cart})
        localStorage.setItem('foundUser', JSON.stringify(updateUserInfo))
      })
    })
    .catch (err => console.log('err adding cart item...', err))
  }

  reduceCartItem = (prodname, userid) => {
    CartItemModel.remove(prodname, userid)
    .then(res => {
      console.log("Updated User",res.data);
      const updateUserInfo = res.data  // res.data would already have the changes
      this.setState({userInfo: updateUserInfo, cartitems: res.data.cart})
      localStorage.setItem('foundUser', JSON.stringify(updateUserInfo))
    })
    .catch (err => console.log('err removing cart item...', err))
  }

  buyItemsInCart = (prodArr, userid) => {
    console.log(prodArr, userid)
    CartItemModel.buy(prodArr, userid)
    .then(res => {
      console.log("Updated User",res.data);
      const updateUserInfo = res.data  // res.data would already have the changes
      this.setState({userInfo: updateUserInfo, cartitems: res.data.cart})
      localStorage.setItem('foundUser', JSON.stringify(updateUserInfo))
    })
    .catch (err => console.log('err removing cart item...', err))
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

export default Cart;