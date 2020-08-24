import React from 'react'
import ProductModel from '../models/product'
import IndexItem from '../components/IndexItem/IndexItem'
import '../App.css'


class Index extends React.Component {
  removeProduct = (id, prodType) => {
    // alert('In Index')
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
    console.log(this.props);
    console.log(this.props.location.state);
    const products = this.props.location.state;
    const displayProducts = products.map(prod => {
      return <IndexItem prod={prod} key={prod._id} removeProduct={this.removeProduct} />
    })

    const prod = this.props.location.state[0];
    return (
      <>
      <section className="products">
        <div className="title">
            <div className="card ind-name border">
                <h2>{products[0].prodType} Inventory</h2>
            </div>
        </div>
        {displayProducts}
      </section>
      </>
    )
  }
}

export default Index;