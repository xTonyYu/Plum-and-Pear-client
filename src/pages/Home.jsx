import React from 'react'

class Home extends React.Component {
  state = {
    products: [],
  }

  componentDidMount() {
    console.log('HOME page Comp Did Mount - FETCH PRODUCT DATA');
  }

  render() {
    return (
      <div>
        <h1>Plum and Pear Home</h1>
      </div>
    )
  }
}

export default Home;