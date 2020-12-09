import React from 'react'
import { withRouter } from 'react-router-dom'
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
  //   try {
  //     let prod = await ProductModel.getAllProducts()
  //     console.log('Products data...', prod.data);
  //     let data = await prod.data
  //     this.setState({porducts: data})
  //   } catch (err) {
  //     console.log('err getting all products...', err);
  //   }
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

  removeProduct = (id, prodType) => {
    // alert('In Dashboard, id =', id)
    ProductModel.removeProduct(id)
    .then(res => {
      let products = this.state.products.filter(prod => {
        console.log(prod)
        return prod._id !== res.data._id
      })
      console.log(products)
      this.setState({products})
      this.props.history.push('/admin')
    })
    .catch(err => console.log('err deleting...', err))
  }

  render() { 
    return (
      <div className="dash-container container">
        <h1>Manager's Dashboard</h1>
        <DisplayCards 
          products={this.state.products} 
          users={this.state.users} 
          removeProduct={this.removeProduct}
          admin={this.props.admin}
        />
      </div>
    )
  }
}

export default withRouter(Products);