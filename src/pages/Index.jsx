import React from 'react'
import IndexItem from '../components/IndexItem/IndexItem'
import ProductModel from '../models/product'
import '../App.css'

// function Index(props) {
class Index extends React.Component {
  removeProduct = (id, prodType) => {
    ProductModel.removeProduct(id)
    .then(res => {
      let products = this.props.location.allProducts.filter(prod => {
        return prod._id !== res.data._id
      })
      // console.log(products)
      this.setState({products})
      this.props.history.push('/admin')
    })
    .catch(err => console.log('err deleting...', err))
  }

  render() {
    const location = this.props.location
    const products = this.props.location.state;
    const displayProducts = products.map(prod => {
      return <IndexItem prod={prod} key={prod._id} allProducts={this.props.location.allProducts} removeProduct={this.removeProduct} admin={this.props.location.admin} />
    })

    return (
      <>
      <section className="products">
        <div className="title">
            <div className="card ind-name border">
                <h2>{products[0].prodType} Inventory</h2>
            </div>
        </div>
        <div className="prod-wrapper">
          {displayProducts}
        </div>
      </section>
      </>
    )
  }
}

export default Index;