import React from 'react'

const currencyStyle = { style: 'currency', currency: 'USD' };
const formatToCurrency = function formatToCurrency(variable, string, currencyStyle) {
    return Intl.NumberFormat(string, currencyStyle).format(variable);
}

function CartItem(props) {
    const { cartItem, userInfo, reduceCartItem, increaseCartItem } = props

    return (
      <>
      <div className="cart-row border">
        <div className="show-photo border"><img src={cartItem.product.image} className="photo border" alt-text={cartItem.product.name} /></div>
        <div className="cart-cell row-name" >{cartItem.product.name}</div>
        <div className="cart-cell row-price">Unit Price: { formatToCurrency(cartItem.product.price, 'en-US', currencyStyle) } </div>
        <div className="cart-cell row-quantity">Qty: { Intl.NumberFormat('en-US').format(cartItem.totQty) }</div>

        <div className="cart-cell btn-group row-action" role="group" aria-label="Basic example">
          <img onClick={() => increaseCartItem(cartItem)} src="./icons/uparrow.png" className="arrow" id="increase" />
          <img onClick={() => reduceCartItem(cartItem)} src="./icons/downarrow.png" className="arrow" id="decrease" />
        </div>
        
        <div className="cart-cell row-totprice">{formatToCurrency(cartItem.totPrice, 'en-US', currencyStyle)} </div>
        
      </div>
      </>
    )
  
}

export default CartItem;