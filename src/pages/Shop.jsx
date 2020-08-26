import React from 'react'
import ProductModel from '../models/product'
import UserModel from '../models/user'
import IndexItem from '../components/IndexItem/IndexItem'
import '../App.css'

class Shop extends React.Component {
  state = {
    products: [],
    userInfo: this.props.userInfo,
  }

  componentDidMount() {
    console.log('Shop page Comp Did Mount');
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
  
  render() {
    const displayProducts = this.state.products.map(prod => {
        const fav = this.state.userInfo.favorite.includes(prod._id) ? 'heart' : ''
        return <IndexItem prod={prod} userInfo={this.state.userInfo} toggleFav={this.toggleFav} fav={fav} key={prod._id} currentUser={this.props.currentUser} admin={this.props.admin} />
    })
    // console.log("UserInfo: ", this.state.userInfo);
    // console.log("Products", this.state.products);
    return (
      <>
        <section className="products">
          <div className="title">
              <div className="card ind-name border">
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