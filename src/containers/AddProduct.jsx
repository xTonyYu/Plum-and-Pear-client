import React from 'react'
import ProductModel from '../models/product'

class AddProduct extends React.Component {
  state = {
    name: '',
    prodType: '',
    price: 0,
    cost: 0,
    quantity: 0,
    descrption: '',
    image: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    ProductModel.addProduct(this.state)
    .then(res => console.log(res))
    .catch(err => console.log("err adding product...", err))
    this.props.history.push('/admin')
  }

  render() {
    console.log(this.props)
    return (
      <>
      <div className="container">
        <h2>Add New Product</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label >Product Name</label>
            <input onInput={this.handleChange} type="text" name="name" required />
          </div>
          <div>
            <label >Product Type</label>
            <input onInput={this.handleChange} type="text" name="prodType" required />
          </div>
          <div>
            <label >Price</label>
            <input onInput={this.handleChange} type="number" step="0.01" name="price" required />
          </div>
          <div>
            <label >Cost</label>
            <input onInput={this.handleChange} type="number" step="0.01" name="cost" required />
          </div>
          <div>
            <label >Quantity</label>
            <input onInput={this.handleChange} type="number" name="quantity" required />
          </div>
          <div>
            <label >Image URL</label>
            <input onInput={this.handleChange} type="text" name="image" />
          </div>
          <div>
            <label >Descrption</label>
            <textarea onInput={this.handleChange} type="text" rows="5" name="descrption" />
          </div>
          
          <button type="submit">Add Product</button>
        </form>
      </div>
      </>
    )
  }
}

export default AddProduct;