import React from 'react'
import Summary from '../Summary/Summary'
import './DisplayCards.css'

const currencyStyle = { style: 'currency', currency: 'USD' };
const formatToCurrency = function formatToCurrency(variable, string, currencyStyle) {
    return Intl.NumberFormat(string, currencyStyle).format(variable);
}

function DisplayCards({products, users, removeProduct, editProduct, admin}) {
  // user section
  // const total = users.length;
  // const userCards = users.map(user => {
  //   return <Summary user={user} key={user._id} />
  // })

  // summarizing product price and cost by product type
  const prodTypeSumm = {};
  const array = products.map(prod => {
    let productType;
    if (prod.prodType in prodTypeSumm) {
        productType = prodTypeSumm[prod.prodType]
        productType.totPrice += prod.price * prod.quantity
        productType.totCost += prod.cost * prod.quantity
        productType.totQty += prod.quantity
    } else {
        prodTypeSumm[prod.prodType] = {};
        productType = prodTypeSumm[prod.prodType]
        productType.type = prod.prodType
        productType.totPrice = prod.price * prod.quantity
        productType.totCost = prod.cost * prod.quantity
        productType.totQty = prod.quantity
    }
      productType.avgPrice 
      = productType.totPrice
      / productType.totQty
      const formatAvgPrice = formatToCurrency(productType.avgPrice, 'en-US', currencyStyle);
      productType.avgPrice = formatAvgPrice

      productType.avgCost 
      = productType.totCost
      / productType.totQty
      const formatAvgCost = formatToCurrency(productType.avgCost, 'en-US', currencyStyle);
      productType.avgCost = formatAvgCost
      return prodTypeSumm
    }
  )

  let arrProdTypeSumm = [];
  for (const type in prodTypeSumm) {
      arrProdTypeSumm.push(prodTypeSumm[type])
  }

  const productCards = arrProdTypeSumm.map(prod => {
    const relatedProducts = products.filter(product => (product.prodType === prod.type))
    return <Summary prod={prod} key={prod.type} allProducts={products} relatedProducts={relatedProducts} removeProduct={removeProduct} admin={admin} />
    }
  )

  return (
    <div className="display-container">
      {productCards}
    </div>
  )
}

export default DisplayCards;
