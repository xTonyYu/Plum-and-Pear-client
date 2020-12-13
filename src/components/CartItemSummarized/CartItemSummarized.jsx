import React from 'react'
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

function CartItemSummarized({ userInfo, cart, currentUser, reduceCartItem, increaseCartItem, buyItemsInCart}) {
  let cartTotalPriceRaw = 0, cartTotalQty = 0;

  const cartItems = cart.map(item => {
    cartTotalPriceRaw += item.totPrice
    cartTotalQty += item.totQty
    return <CartItem cartItem={item} key={item._id} reduceCartItem={reduceCartItem} increaseCartItem={increaseCartItem} userInfo={userInfo} />
  })

  cartTotalPriceRaw = cartTotalPriceRaw.toFixed(2)
  const cartTotalPriceUSD = formatToCurrency(cartTotalPriceRaw, 'en-US', currencyStyle);

  return (
    <div className="cart-container">
      {cartItems}
      <div className="grand-total">
        <div className="table-cell total-wrapper">
          <div className="cart-total" >Grand Total</div>
          <div className="cart-quantity">Qty: { Intl.NumberFormat('en-US').format(cartTotalQty) }</div>
          <div className="cart-price">{cartTotalPriceUSD} </div>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm cartTotalPriceRaw={cartTotalPriceRaw} buyItemsInCart={buyItemsInCart} cart={cart} userInfo={userInfo} />
        </Elements>
      </div>
    </div>
  )
}


export default CartItemSummarized;