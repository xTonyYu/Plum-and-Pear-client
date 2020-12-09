import React from 'react'
import ProductModel from '../models/product'

class EditProduct extends React.Component {
  state = {
    // product: this.props.location.state,
    name: this.props.location.state.name,
    prodType: this.props.location.state.prodType,
    price: this.props.location.state.price,
    cost: this.props.location.state.cost,
    quantity: this.props.location.state.quantity,
    descrption: this.props.location.state.descrption,
    image: this.props.location.state.image,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // console.log(this.props)
    // this.props.location.editProduct(this.props.location.state._id, this.state)
    ProductModel.editProduct(this.props.location.state._id, this.state)
    .then(res => {
      console.log(res)
      this.props.history.push('/admin')
    })
    .catch(err => console.log("err editing product in EditProduct.jsx...", err))
  }

  render() {
    const product = this.props.location.state;
    console.log(this.props)
    console.log(this.state)
    return (
      <>
      <div className="container">
        <h2>Edit Product</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label >Product Name</label>
            <input onInput={this.handleChange} type="text" name="name" defaultValue={product.name} required />
          </div>
          <div>
            <label >Product Type</label>
            <input onInput={this.handleChange} type="text" name="prodType" defaultValue={product.prodType} required />
          </div>
          <div>
            <label >Price</label>
            <input onInput={this.handleChange} type="number" step="0.01" name="price" defaultValue={product.price} required />
          </div>
          <div>
            <label >Cost</label>
            <input onInput={this.handleChange} type="number" step="0.01" name="cost" defaultValue={product.cost} required />
          </div>
          <div>
            <label >Quantity</label>
            <input onInput={this.handleChange} type="number" name="quantity" defaultValue={product.quantity} required />
          </div>
          <div>
            <label >Image URL</label>
            <input onInput={this.handleChange} type="text" name="image" defaultValue={product.image}/>
          </div>
          <div>
            <label >Descrption</label>
            <textarea onInput={this.handleChange} type="text" rows="5" name="descrption" defaultValue={product.descrption} />
          </div>
          
          <button type="submit">Submit Update</button>
        </form>
      </div>
      </>
    )
  }
}

export default EditProduct;