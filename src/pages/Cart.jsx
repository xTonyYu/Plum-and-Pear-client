import React from 'react'
import ProductModel from '../models/product'
import UserModel from '../models/user'
import CartItemModel from '../models/cartitem'
import IndexItem from '../components/IndexItem/IndexItem'
import '../App.css'

class Cart extends React.Component {
  state = {
    // products: [],
    userInfo: {},
    cartitems: [],
  }

  componentDidMount() {
    console.log('Cart page Comp Did Mount');
    this.getUserWithAttchment()
    this.getProducts()
  }

  getUserWithAttchment() {
    UserModel.getUserWithAttchment(this.props.userInfo._id)
    .then(res => {
      console.log("getUserWithAttchment data...", res.data);
      this.setState({userInfo: res.data})
    })
  }

  getProducts() {
    ProductModel.getAllProducts()
    .then(prod => {
      console.log("at Home, data:", prod.data);
      this.setState({products: prod.data})
    })
    .catch (err => console.log('err getting all products...', err))
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
              </div>
          </div>

        </section>
        </>
    )
  }
}

export default Cart;