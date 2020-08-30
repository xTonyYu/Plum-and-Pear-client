import React from 'react'
import ProductModel from '../models/product'
import UserModel from '../models/user'
import CartItemModel from '../models/cartitem'
import IndexItem from '../components/IndexItem/IndexItem'
import '../App.css'

class Shop extends React.Component {
  state = {
    products: [],
    // userInfo: this.props.userInfo,
    userInfo: {},
  }

  componentDidMount() {
    let foundUserJson = localStorage.getItem('foundUser')
    let foundUser = JSON.parse(foundUserJson)
    this.setState({userInfo: foundUser})
    // console.log("1) ", this.state.userInfo);
    this.getProducts()
  }

  getProducts() {
    ProductModel.getAllProducts()
    .then(prod => {
      this.setState({products: prod.data})
    })
    .catch (err => console.log('err getting all products...', err))
  }

  toggleFav = (userid, product) => {
    const favAlready = this.state.userInfo.favorite.includes(product._id)
    const updateUserFav = this.state.userInfo
    if (!favAlready) {
      product.liked += 1
      updateUserFav.favorite.push(product._id)
    } else if (product.liked > 1) {
      product.liked -= 1 
      const index = updateUserFav.favorite.indexOf(product._id)
      updateUserFav.favorite.splice(index, 1)
      console.log(updateUserFav.favorite, index);
    } else {
      return
    }

    ProductModel.editProduct(product._id, product)
      .then(res => {
        this.setState({
          ...this.state.products, product
        })
      })
    
    UserModel.editUser(userid, updateUserFav)
      .then(res => {
        console.log("toggle Fav", res.data);
        const updateUserInfo = res.data  // res.data would already have the changes
        this.setState({userInfo: updateUserInfo})
        localStorage.setItem('foundUser', JSON.stringify(updateUserInfo))
      }) 
  }

  addCartItem = (prod, userid) => {
    // check if prod already in the cart
    let newQty;
    const foundItemInCart = this.state.userInfo.cart.find(item => item._id === prod._id)
    if (foundItemInCart) {
      newQty = foundItemInCart.totQty + 1
    } else {
      newQty = 1
    }
    // adding item to CartItem model
    let cartItemData = {
      status: 'in cart',
      totPrice: prod.price,
      totQty: newQty,
      product: prod._id,
      userid: userid,
    }
    console.log(cartItemData);
    CartItemModel.add(cartItemData)
    .then(res => {
      console.log('After item added to the cart',res.data);
      // get updated user info after adding cart item
      UserModel.getUserById(userid)
      .then(res => {
        this.setState({userInfo: res.data})
        localStorage.setItem('foundUser', JSON.stringify(res.data))
      })
    })
    .catch (err => console.log('err adding cart item...', err))
  }
  
  render() {
    const userInfoExist = this.state.userInfo ? this.state.userInfo.favorite || [] : []
    const displayProducts = this.state.products.map(prod => {
        const fav = userInfoExist.includes(prod._id) ? 'heart' : ''
        return <IndexItem prod={prod} userInfo={this.state.userInfo} toggleFav={this.toggleFav} fav={fav} key={prod._id} currentUser={this.props.currentUser} addCartItem={this.addCartItem} admin={this.props.admin} />
    })
    // console.log("UserInfo: ", this.state.userInfo);
    // console.log("Products", this.state.products);
    return (
      <>
        <section className="products">
          <div className="title">
              <div className=" ind-name border">
                  <h2>Unique and Artistic</h2>
              </div>
          </div>
          {displayProducts}
        </section>
        </>
    )
  }
}

export default Shop;