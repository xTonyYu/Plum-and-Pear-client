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

  getProdByType(prodType) {
    ProductModel.getProductByType(prodType)
    .then(prod => {
      console.log(prod.data)
      return prod.data;
    })
  }

  removeProduct = (id, prodType) => {
    // alert('In Dashboard, id =', id)
    ProductModel.revmoveProduct(id)
    .then(res => console.log(res))
    .catch(err => console.log('err deleting...', err))
    // this.getProdByType(prodType)
    // .then(prod => {
    //   const relatedProducts = prod.data;
      // this.props.history.push({pathname: '/admin/index', removeProduct: this.removeProduct, state: relatedProducts})
    // })
    this.props.history.push('/admin')
  }

  render() {

    return (
      <div className="container">
        <h1>Manager Dashboard</h1>
        <DisplayCards 
          products={this.state.products} 
          users={this.state.users} 
          removeProduct={this.removeProduct}
        />
      </div>
    )
  }
}

export default Products;