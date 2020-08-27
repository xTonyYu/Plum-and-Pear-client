import React from 'react'
import UserModel from '../models/user'
import CartItemModel from '../models/cartitem'
import CartItemSummarized from '../components/CartItemSummarized/CartItemSummarized'
import '../App.css'

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
    console.log('Cart page Comp Did Mount', this.state.userInfo);
    const id = this.state.userInfo._id || this.props.userInfo._iid || foundUser._id
    this.getUserWithAttchment(id)
  }

  getUserWithAttchment(id) {
    UserModel.getUserWithAttchment(id)
    .then(res => {
      console.log("getUserWithAttchment data...", res.data);
      this.setState({userInfo: res.data, cartitems: res.data.cart})
      localStorage.setItem('foundUser', JSON.stringify(res.data))
    })
  }
  
  render() {
    // const displayProducts = this.state.products.map(prod => {
    //     const userInfoExist = this.state.userInfo.favorite || []
    //     const fav = userInfoExist.includes(prod._id) ? 'heart' : ''
    //     // const fav = 'heart'
    //     return <IndexItem prod={prod} userInfo={this.state.userInfo} toggleFav={this.toggleFav} fav={fav} key={prod._id} currentUser={this.props.currentUser} addCartItem={this.addCartItem} admin={this.props.admin} />
    // })
    console.log("UserInfo: ", this.state.userInfo);
    // console.log("Products", this.state.products);
    return (
      <>
        <section className="products">
          <div className="title">
              <div className=" ind-name border">
                  <h2>Your Shopping Cart</h2>
                  <CartItemSummarized userInfo={this.state.userInfo} cart={this.state.cartitems} currentUser={this.props.currentUser} />
              </div>
          </div>

        </section>
        </>
    )
  }
}

export default Cart;