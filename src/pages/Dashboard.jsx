import React from 'react'
import ProductModel from '../models/product'
import UserModel from '../models/user'
import DisplayCards from '../containers/DisplayCards/DisplayCards'

class Products extends React.Component {
  state = {
    products: [],
    users: [],
  }

  componentDidMount() {
    console.log('inside component did mount - NEED TO FETCH USER and USER DATA');
    this.getProducts()
    this.getUsers()
  }

  async getProducts() {
    try {
      const prod = await ProductModel.getAllProducts()
      console.log('Products data...', prod.data);
      this.setState({porducts: prod.data})
    } catch (err) {
      console.log('err getting all products...', err);
    }
  }

  async getUsers() {
    try {
      const users = await UserModel.getAllUsers()
      console.log('Users data...', users.data);
      this.setState({users: users.data})
    } catch (err) {
      console.log('err getting all users...', err);
    }
  }

  render() {
    console.log('inside Product page render');
    return (
      <div className="container">
        <h1>Manager Dashboard</h1>
        <DisplayCards products={this.state.products} />
      </div>
    )
  }
}

export default Products;