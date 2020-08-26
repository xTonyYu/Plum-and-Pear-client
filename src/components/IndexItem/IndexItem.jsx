import React from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'
import './IndexItem.css'

const currencyStyle = { style: 'currency', currency: 'USD' }

class IndexItem extends React.Component {
  handleClickDelete = () => {
    alert('Delete prod id =', this.props.prod._id)

  }
  // componentWillUnmount() {
  //   console.log("unmounting in IndexItem", this.props.prod._id)
  // }

  render() {
    const favStatus = 'btn btn-secondary fav-btn ' + this.props.fav
    return (
      <>
      <div className="table-row border">
        <div className="show-photo border"><img src={this.props.prod.image} className="photo border" alt-text={this.props.prod.name} /></div>
        <div className="table-cell row-name" >{this.props.prod.name}</div>
        <div className="table-cell row-likes" >Likes {this.props.prod.liked}</div>

        {this.props.currentUser && (
        <>
        <button onClick={() => this.props.toggleFav(this.props.userInfo._id, this.props.prod)} type="button" className={favStatus} id="fav"><img src="./icons/heart.png" alt="heart" className={this.props.fav} id="heart" /></button>
        
        </>
        )}

        <div className="table-cell row-price-cost">
            <div className="table-cell row-price">Price: { Intl.NumberFormat('en-US', currencyStyle).format(this.props.prod.price) } </div>
            <div className="table-cell row-cost">Cost: { Intl.NumberFormat('en-US', currencyStyle).format(this.props.prod.cost) } </div>
        </div>
        <div className="table-cell row-quantity">Qty: { Intl.NumberFormat('en-US').format(this.props.prod.quantity) }</div>
        
        {this.props.admin && (
        <div className="table-cell btn-group row-action" role="group" aria-label="Basic example">
            <button onClick={() => this.props.removeProduct(this.props.prod._id, this.props.prod.prodType)} type="button" className="btn btn-secondary delete-btn">Delete</button>

            <Link to={{pathname: '/admin/editprod', editProduct: this.props.editProduct, state: this.props.prod}} >
                <button type="submit" type="button" className="btn btn-secondary btn-right">Update</button>
            </Link>
        </div>
        )}
      </div>
      </>
    )
  }
}

export default IndexItem;