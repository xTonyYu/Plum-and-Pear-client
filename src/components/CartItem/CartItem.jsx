import React from 'react'
import { Link } from 'react-router-dom'

const currencyStyle = { style: 'currency', currency: 'USD' };
const formatToCurrency = function formatToCurrency(variable, string, currencyStyle) {
    return Intl.NumberFormat(string, currencyStyle).format(variable);
}

function CartItem(props) {
    const { prod } = props
    return (
      <>
      <div className="table-row border">
        <div className="show-photo border"><img src={prod.image} className="photo border" alt-text={prod.name} /></div>
        <div className="table-cell row-name" >{prod.name}</div>
        <div className="table-cell row-price">Unit Price: {prod.unitPrice} </div>
        <div className="table-cell row-quantity">Qty: { Intl.NumberFormat('en-US').format(prod.totQty) }</div>
        <div className="table-cell row-price">Total Price: {formatToCurrency(prod.totPrice, 'en-US', currencyStyle)} </div>

        {/* <button onClick={() => toggleFav(userInfo._id, prod)} type="button" className={favStatus} id="fav"><img src="./icons/heart.png" alt="heart" className={fav} id="heart" /></button>
        <div>

        <img onClick={() => addCartItem(prod.name, prod.price, prod.image, userInfo._id )} src="./icons/color-cart.png" className="cart" id="cart" />
        </div> */}


        
        {/* <div className="table-cell btn-group row-action" role="group" aria-label="Basic example">
            <button onClick={() => removeProduct(prod._id, prod.prodType)} type="button" className="btn btn-secondary delete-btn">Delete</button>
        </div> */}
        
      </div>
      </>
    )
  
}

export default CartItem;