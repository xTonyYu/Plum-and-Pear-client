import React from 'react'
import ProductModel from '../models/product'
import Routes from '../config/routes';
// import DisplayCards from '../components/DisplayCards/DisplayCards'

class Home extends React.Component {
  state = {
    products: [],
  }

  componentDidMount() {
    console.log('HOME page Comp Did Mount');
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
    return (
      <div className="container">
        <h1>Plum and Pear Home</h1>
        {/* <Routes products={this.state.products} /> */}
      </div>
    )
  }
}

export default Home;