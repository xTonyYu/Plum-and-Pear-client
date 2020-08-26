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
    console.log('Shop page Comp Did Mount');
    this.setState({userInfo: this.props.userInfo})
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
        const updateUserInfo = this.props.userInfo
        if (direction === 'add') {
          updateUserInfo.favorite.push(product._id)
        } else if (direction === 'remove') {
          const index = updateUserInfo.favorite.indexOf(product._id)
          updateUserInfo.favorite.splice(index, 1)
        }
        this.setState({userInfo: updateUserInfo})
      }) 
  }

  addCartItem = (prodname, prodimg, userid) => {
    console.log(prodname, prodimg, userid)
    // adding item to CartItem model
    let itemdata = {
      prodName: prodname,
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
    })
  }
  
  render() {
    const displayProducts = this.state.products.map(prod => {
        const userInfoExist = this.state.userInfo.favorite || []
        const fav = userInfoExist.includes(prod._id) ? 'heart' : ''
        // const fav = 'heart'
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