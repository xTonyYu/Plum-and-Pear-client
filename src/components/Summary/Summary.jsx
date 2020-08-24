import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import './Summary.css'

function Summary(props) {

    return (
      <div className="card dashcard border">
        {console.log(props.removeProduct)}
        <div className="card-body">
          <h3 className="card-title"><a className="lk-rm" href="/<%= type.name %>">{props.prod.type}</a></h3>
          <p>Quantity: {props.prod.totQty}</p>
          <p>Average Price: {props.prod.avgPrice}</p>
          <p>Average Cost: {props.prod.avgCost}</p>
          <div className="btn-group dash-btn-grp " role="group" aria-label="Basic example">
              <Link to={{pathname: '/admin/index', removeProduct: props.removeProduct, state: props.relatedProducts}} >
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