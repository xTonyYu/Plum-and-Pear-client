import React from 'react'
import ProductModel from '../models/product'
import Routes from '../config/routes';
// import DisplayCards from '../components/DisplayCards/DisplayCards'

class Home extends React.Component {
  state = {
    products: [],
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