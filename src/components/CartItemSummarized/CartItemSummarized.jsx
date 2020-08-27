import React from 'react'

const currencyStyle = { style: 'currency', currency: 'USD' };
const formatToCurrency = function formatToCurrency(variable, string, currencyStyle) {
    return Intl.NumberFormat(string, currencyStyle).format(variable);
}

function CartItemSummarized({ userInfo, cart, currentUser}) {
  console.log(userInfo)

  // summarizing items in the cart; grouping same items together
  const prodNameSumm = {};
  cart.map(item => {
    console.log("1) item from inside of the LOOP", item);
    let productName;
    if (item.prodName in prodNameSumm) {
      productName = prodNameSumm[item.prodName]
      productName.totPrice += item.price * item.quantity
      productName.totQty += item.quantity
    } else {
      prodNameSumm[item.prodName] = {};
      productName = prodNameSumm[item.prodName]
      productName.Name = item.prodName
      productName.totPrice = item.price * item.quantity
      productName.totQty = item.quantity
    }
    const formatUnitPrice = formatToCurrency(item.price, 'en-US', currencyStyle);
      productName.unitPrice = formatUnitPrice
  })

  let arrProdNameSumm = [];
  for (const name in prodNameSumm) {
      arrProdNameSumm.push(prodNameSumm[name])
  }

  const cartItems = arrProdNameSumm.map(item => {
    console.log("3) after summarized item...", item);
  })

  return (
    <>
      <h1>CartItemSummarized</h1>
    </>
  )
}


export default CartItemSummarized;