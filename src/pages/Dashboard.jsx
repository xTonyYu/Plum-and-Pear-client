import React from "react"

class Products extends React.Component {
  state = {
    products: [],
  }

  componentDidMount() {
    console.log('inside component did mount - NEED TO FETCH USER DATA');
  }

  render() {
    console.log('inside Product page render');
    return (
      <div className="container">
        <h1>Dashboard</h1>
      </div>
    )
  }
}

export default Products;