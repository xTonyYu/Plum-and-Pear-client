import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import './Summary.css'

class Summary extends React.Component {
  handleClickDetails() {
    console.log(this.props);
    // this.props.history.push('/admin/index')
  }

  render() {
    console.log(this.props);
    return (
      <div className="card dashcard border">
        <div className="card-body">
          <h3 className="card-title"><a className="lk-rm" href="/<%= type.name %>">{this.props.prod.type}</a></h3>
          <p>Quantity: {this.props.prod.totQty}</p>
          <p>Average Price: {this.props.prod.avgPrice}</p>
          <p>Average Cost: {this.props.prod.avgCost}</p>
          <div className="card-body btn-group dash-btn-grp " role="group" aria-label="Basic example">
              <Link to={{pathname: '/admin/index', state: this.props.relatedProducts}} >
                  <button type="button" className="btn btn-secondary" >Details</button>
              </Link>
              {/* <Redirect to="/admin/index" >
                  <button type="button" className="btn btn-secondary" >Details</button>
              </Redirect> */}
              <a onClick={this.handleClickDetails}>
                  <button type="button" className="btn btn-secondary" >Add new</button>
              </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Summary;