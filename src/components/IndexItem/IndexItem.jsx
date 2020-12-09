import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import './IndexItem.css'

const currencyStyle = { style: 'currency', currency: 'USD' }

// class IndexItem extends React.Component {
//   render() {
function IndexItem(props) {
    const favStatus = 'btn btn-secondary fav-btn ' + props.fav
    const showDeleteUpdateBtn = props.removeProduct !== undefined ? true : false
    return (
      <>
      <div className="table-row border">
        <div className="show-photo border"><img src={props.prod.image} className="photo border" alt-text={props.prod.name} /></div>
        <div className="table-cell row-name" >{props.prod.name}</div>
        <div className="table-cell row-likes" >Likes: {props.prod.liked}</div>

        {props.currentUser && (
        <>
        <button onClick={() => props.toggleFav(props.userInfo._id, props.prod)} type="button" className={favStatus} id="fav"><img src="./icons/heart.png" alt="heart" className={props.fav} id="heart" /></button>
        
        <div className="add">
        <img onClick={() => props.addCartItem(props.prod, props.userInfo._id )} src="./icons/color-cart.png" className="cart add" id="add" />
        </div>
        
        </>
        )}

        <div className="table-cell row-price-cost">
            <div className="table-cell row-price">Price: { Intl.NumberFormat('en-US', currencyStyle).format(props.prod.price) } </div>

            {props.admin == 'true' && (
            <div className="table-cell row-cost">Cost: { Intl.NumberFormat('en-US', currencyStyle).format(props.prod.cost) } </div>
            )}

        </div>
        <div className="table-cell row-quantity">Qty: { Intl.NumberFormat('en-US').format(props.prod.quantity) }</div>
        
        {(props.admin && props.admin !== 'false' && showDeleteUpdateBtn) && (
        <div className="table-cell btn-group row-action" role="group" aria-label="Basic example">
            <button onClick={() => props.removeProduct(props.prod._id, props.prod.prodType)} type="button" className="btn btn-secondary delete-btn">Delete</button>

            <Link to={{pathname: '/admin/editprod', state: props.prod}} >
                <button type="submit" type="button" className="btn btn-secondary btn-right">Update</button>
            </Link>
        </div>
        )}
      </div>
      </>
    )
  }
// }

export default IndexItem;