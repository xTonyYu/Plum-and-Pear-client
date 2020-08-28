import React from 'react'

const currencyStyle = { style: 'currency', currency: 'USD' };
const formatToCurrency = function formatToCurrency(variable, string, currencyStyle) {
    return Intl.NumberFormat(string, currencyStyle).format(variable);
}

function CartItem(props) {
    const { prod, userInfo, reduceCartItem, increaseCartItem } = props

    return (
      <>
      <div className="cart-row border">
        <div className="show-photo border"><img src={prod.image} className="photo border" alt-text={prod.name} /></div>
        <div className="table-cell row-name" >{prod.name}</div>
        <div className="table-cell row-price">Unit Price: { formatToCurrency(prod.unitPrice, 'en-US', currencyStyle) } </div>
        <div className="table-cell row-quantity">Qty: { Intl.NumberFormat('en-US').format(prod.totQty) }</div>

        <div className="table-cell btn-group row-action" role="group" aria-label="Basic example">
          <img onClick={() => increaseCartItem(prod.name, prod.unitPrice, prod.image, userInfo._id )} src="./icons/uparrow.png" className="arrow" id="increase" />
          <img onClick={() => reduceCartItem(prod.name, userInfo._id )} src="./icons/downarrow.png" className="arrow" id="decrease" />
        </div>
        
        <div className="table-cell row-price">Price: {formatToCurrency(prod.totPrice, 'en-US', currencyStyle)} </div>
        
      </div>
      </>
    )
  
}

export default CartItem;