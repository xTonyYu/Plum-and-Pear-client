import React from 'react'
import ProductModel from '../models/product'
import DisplayCards from '../containers/DisplayCards/DisplayCards'

class Home extends React.Component {
  state = {
    products: [],
  }

  componentDidMount() {
    console.log('HOME page Comp Did Mount');
  }

  render() {
    return (
      <div className="container">
        <h1>Plum and Pear Home</h1>
      </div>
    )
  }
}

export default Home;