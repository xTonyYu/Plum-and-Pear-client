import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import './IndexItem.css'

const currencyStyle = { style: 'currency', currency: 'USD' }

// class IndexItem extends React.Component {
//   render() {
function IndexItem(props) {
    const favStatus = 'btn btn-secondary fav-btn ' + props.fav
    const heartImg = !props.fav ? './icons/heart.png' : './icons/red-heart.png'
    const mngInventory = props.removeProduct !== undefined ? true : false
    return (
      <>
      <div className="prod-card border">
        <div className="show-photo border"><img src={props.prod.image} className="photo border" alt-text={props.prod.name} /></div>
        <div className="card-row row-name" >{props.prod.name}</div>

        {props.currentUser && (
        <>
        <div className="card-row row-like-wrapper">
          <div className="likes" >Likes: {props.prod.liked}</div>
          <button onClick={() => props.toggleFav(props.userInfo._id, props.prod)} type="button" className={favStatus} id="fav"><img src={heartImg} alt="heart" className={props.fav} id="heart" /></button>
        </div>
        </>
        )}

        <div className="card-row row-price-add">
            <div className="price">{ Intl.NumberFormat('en-US', currencyStyle).format(props.prod.price) } </div>
            {props.currentUser && (
              <>
            <div className="add">
            <img onClick={() => props.addCartItem(props.prod, props.userInfo._id )} src="./icons/color-cart.png" className="cart add" id="add" />
            </div>
            </>
            )}
        </div>

        {props.admin == 'true' && !props.currentUser && (
        <div className="card-row row-cost-qty">
          <div className="cost">Cost: { Intl.NumberFormat('en-US', currencyStyle).format(props.prod.cost) } </div>
          <div className="quantity">Qty: { Intl.NumberFormat('en-US').format(props.prod.quantity) }</div>
        </div>
        )}
        
        {(props.admin && props.admin !== 'false' && mngInventory) && (
        <div className="card-row btn-group row-action" role="group" aria-label="Basic example">
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