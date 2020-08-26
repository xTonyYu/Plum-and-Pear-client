import React from 'react'
import ProductModel from '../models/product'
import IndexItem from '../components/IndexItem/IndexItem'
import '../App.css'

class Shop extends React.Component {
  state = {
    products: [],
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
  
  render() {
    const displayProducts = this.state.products.map(prod => {
        return <IndexItem prod={prod} key={prod._id} admin={this.props.admin} />
    })
    console.log(this.state.products);
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