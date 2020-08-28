import React from 'react'
import { Link } from 'react-router-dom'
import './Summary.css'

function Summary(props) {

    return (
      <div className="card dashcard border">
        <div className="card-body">
          <h3 className="card-title"><span>{props.prod.type}</span>Products</h3>
          <p>Quantity: {props.prod.totQty}</p>
          <p>Average Price: {props.prod.avgPrice}</p>
          <p>Average Cost: {props.prod.avgCost}</p>
          <div className="btn-group dash-btn-grp " role="group" aria-label="Basic example">
              <Link to={{pathname: '/admin/index', removeProduct: props.removeProduct, editProduct: props.editProduct, state: props.relatedProducts, admin: props.admin }} >
                  <button type="button" className="btn btn-secondary" >Detail</button>
              </Link>
              {/* <a >
                  <button type="button" className="btn btn-secondary" >Add new</button>
              </a> */}
          </div>
        </div>
      </div>
    )
  
}

export default Summary;