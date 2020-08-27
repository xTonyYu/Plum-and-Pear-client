import React, { useState } from 'react'
// importing Stripe API
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../Stripe/CheckoutForm'

import CartItem from '../CartItem/CartItem'

// const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
const stripePromise = loadStripe('pk_test_51HKd1qFxosFcUDRDfxXhRwFz4kNnu6schUawTEI4c3TOue7ezWNhB7NQ1fshiEIrBl2sc6CHLrhFr4T8XXjr475600fVxDizVg');
const currencyStyle = { style: 'currency', currency: 'USD' };
const formatToCurrency = function formatToCurrency(variable, string, currencyStyle) {
    return Intl.NumberFormat(string, currencyStyle).format(variable);
}

function CartItemSummarized({ userInfo, cart, currentUser}) {
  console.log(userInfo)

  // summarizing items in the cart; grouping same items together
  const prodNameSumm = {};
  cart.map(item => {
    console.log("1) item from inside of the LOOP", item); // <<<<<<<<<<<<<<<<<<<<<<<<<<
    let productName;
    if (item.prodName in prodNameSumm) {
      productName = prodNameSumm[item.prodName]
      productName.totPrice += item.pricel

      productName.totQty += 1
    } else {
      prodNameSumm[item.prodName] = {};
      productName = prodNameSumm[item.prodName]
      productName.name = item.prodName
      productName.image = item.prodImg
      productName.totPrice = item.price
      productName.totQty = 1
    }
    const formatUnitPrice = formatToCurrency(item.price, 'en-US', currencyStyle);
      productName.unitPrice = formatUnitPrice
  })

  let arrProdNameSumm = [];
  for (const name in prodNameSumm) {
      arrProdNameSumm.push(prodNameSumm[name])
  }
  let cartTotalPriceRaw = 0, cartTotalQty = 0;
  const cartItems = arrProdNameSumm.map(item => {
    console.log("2) ProdNameSumm item: ", item); // <<<<<<<<<<<<<<<<<<<<<<<<<<
    cartTotalPriceRaw += item.totPrice
    cartTotalQty += item.totQty
    return <CartItem prod={item} key={item.name} />
  })
  cartTotalPriceRaw = cartTotalPriceRaw.toFixed(2)
  const cartTotalPriceUSD = formatToCurrency(cartTotalPriceRaw, 'en-US', currencyStyle);
  console.log(cartTotalPriceUSD, cartTotalQty);

  return (
    <div className="cart-container">
      {cartItems}
      <div className="grand-total">
        <div className="table-cell row-name" >Grand Total</div>
        <div className="table-cell row-quantity">Qty: { Intl.NumberFormat('en-US').format(cartTotalQty) }</div>
        <div className="table-cell row-price">Total Price: {cartTotalPriceUSD} </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm cartTotalPriceRaw={cartTotalPriceRaw} />
        </Elements>
      </div>
    </div>
  )
}


export default CartItemSummarized;