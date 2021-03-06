import React from 'react'
import { withRouter } from 'react-router-dom'
import ProductModel from '../models/product'

class AddProduct extends React.Component {
  state = {
    name: '',
    prodType: '',
    price: 0,
    cost: 0,
    quantity: 0,
    description: '',
    image: '/images/no-image-available.jpg',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // if (this.state.image !== '/images/no-image-available.jpg') 
    // this.setState({image: '/images/no-image-available.jpg'})
    ProductModel.addProduct(this.state)
    .then(res => {
      console.log(res)
      this.props.history.push('/admin')
    })
    .catch(err => console.log("err adding product...", err))
  }

  render() {
    
    return (
      <>
      <div className="add-container container">
        <h2>Add New Product</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label >Product Name</label>
            <input onInput={this.handleChange} type="text" name="name" placeholder="Product Name" required />
          </div>
          <div>
            <label >Product Type</label>
            <input onInput={this.handleChange} type="text" name="prodType" placeholder="Product Type" required />
          </div>
          <div>
            <label >Price</label>
            <input onInput={this.handleChange} type="number" step="0.01" name="price" placeholder="Price" required />
          </div>
          <div>
            <label >Cost</label>
            <input onInput={this.handleChange} type="number" step="0.01" name="cost" placeholder="Cost" required />
          </div>
          <div>
            <label >Quantity</label>
            <input onInput={this.handleChange} type="number" name="quantity" placeholder="Quantity" required />
          </div>
          <div>
            <label >Image URL</label>
            <input onInput={this.handleChange} type="text" name="image" placeholder="Image URL" />
          </div>
          <div>
            <label >Description</label>
            <textarea onInput={this.handleChange} type="text" rows="5" name="description" placeholder="description" />
          </div>
          
          <button type="submit">Add Product</button>
        </form>
      </div>
      </>
    )
  }
}

export default withRouter(AddProduct);