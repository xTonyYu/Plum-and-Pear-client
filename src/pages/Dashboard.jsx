import React from 'react'
import ProductModel from '../models/product'
import UserModel from '../models/user'
import DisplayCards from '../components/DisplayCards/DisplayCards'

class Products extends React.Component {
  state = {
    products: [],
    users: [],
  }

  componentDidMount() {
    this.getProducts()
    this.getUsers()
  }

  // async getProducts() {
  //   // try {
  //     let prod = await ProductModel.getAllProducts()
  //     console.log('Products data...', prod.data);
  //     let data = await prod.data
  //     this.setState({porducts: data})
  //   // } catch (err) {
  //   //   console.log('err getting all products...', err);
  //   // }
  // }

  getProducts() {
    ProductModel.getAllProducts()
    .then(prod => {
      this.setState({products: prod.data})
    })
    .catch (err => console.log('err getting all products...', err))
  }

  getUsers() {
    UserModel.getAllUsers()
    .then(users => {
      this.setState({users: users.data})
    })  
    .catch(err => console.log('err getting all users...', err))
  }

  render() {

    return (
      <div className="container">
        <h1>Manager Dashboard</h1>
        <DisplayCards products={this.state.products} users={this.state.users} />
      </div>
    )
  }
}

export default Products;