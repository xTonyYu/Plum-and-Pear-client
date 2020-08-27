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
    this.getProducts()
  }

  getProducts() {
    ProductModel.getAllProducts()
    .then(prod => {
      console.log("at Home, data:", prod.data);
      this.setState({products: prod.data})
    })
    .catch (err => console.log('err getting all products...', err))
  }

  toggleFav = (userid, product) => {
    const favAlready = this.state.userInfo.favorite.includes(product._id)
    let direction = '';
    if (!favAlready) {
      product.liked += 1
      direction = 'add'
    } else if (product.liked > 1) {
      product.liked -= 1 
      direction = 'remove'
    } else {
      return
    }
    ProductModel.editProduct(product._id, product)
      .then(res => {
        this.setState({
          ...this.state.products, product
        })
      })
    
    UserModel.toggleFav(userid, product, direction)
      .then(res => {
        const updateUserInfo = res.data  // res.data would already have the changes
        this.setState({userInfo: updateUserInfo})
        localStorage.setItem('foundUser', JSON.stringify(updateUserInfo))
      }) 
  }

  addCartItem = (prodname, price, prodimg, userid) => {
    console.log(prodname, price, prodimg, userid)
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
    })
    .catch (err => console.log('err adding cart item...', err))
    // get updated user info after adding cart item
    UserModel.getUserById(userid)
    .then(res => {
      this.setState({userInfo: res.data})
      localStorage.setItem('foundUser', JSON.stringify(res.data))
    })
  }
  
  render() {
    const userInfoExist = this.state.userInfo.favorite || []
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