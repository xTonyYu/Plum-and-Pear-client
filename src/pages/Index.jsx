import React from 'react'
import IndexItem from '../components/IndexItem/IndexItem'
import '../App.css'

function Index(props) {
// class Index extends React.Component {

  // render() {
    console.log(props);
    console.log(props.location.state);
    const products = props.location.state;
    const displayProducts = products.map(prod => {
      return <IndexItem prod={prod} key={prod._id} removeProduct={props.location.removeProduct} editProduct={props.location.editProduct} admin={props.location.admin} />
    })

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
  // }
}

export default Index;