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
      <div className="home-container">
        <svg viewBox="30 20 500 500">
          <path id="curve" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,275.1,97" />
          <text width="100" className="home-text">
            <textPath xlinkHref="#curve">
              Welcome to the PLUM & PEAR Store  
            </textPath>
          </text>
        </svg>
        {/* <Routes products={this.state.products} /> */}
      </div>
    )
  }
}

export default Home;