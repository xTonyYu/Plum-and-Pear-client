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
    // try {
  //     let prod = await ProductModel.getAllProducts()
  //     console.log('Products data...', prod.data);
  //     let data = await prod.data
  //     this.setState({porducts: data})
    // } catch (err) {
    //   console.log('err getting all products...', err);
    // }
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

  editProduct = (id, prod) => {
    const isUpdatedProd = p => {
      return p._id === id
    }
    ProductModel.editProduct(id, prod)
    .then(res => {
      console.log(this.state.products)
      let products = this.state.products.find(isUpdatedProd)
      products.name = prod.name
      products.prodType = prod.prodType
      products.price = prod.price
      products.cost = prod.cost
      products.quantity = prod.quantity
      products.descrption = prod.descrption
      products.image = prod.image
      this.setState({...this.state.products, products})
      this.props.history.push('/admin')
    })
    .catch(err => console.log("err editing product...", err))
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
      // this.props.history.push('/admin')
    })
    .catch(err => console.log('err deleting...', err))
    // this.getProdByType(prodType)
    // .then(prod => {
    //   const relatedProducts = prod.data;
      // this.props.history.push({pathname: '/admin/index', removeProduct: this.removeProduct, state: relatedProducts})
    // })
  }

  render() { 

    return (
      <div className="dash-container">
        <h1>Manager's Dashboard</h1>
        <DisplayCards 
          products={this.state.products} 
          users={this.state.users} 
          removeProduct={this.removeProduct}
          editProduct={this.editProduct}
        />
      </div>
    )
  }
}

export default Products;