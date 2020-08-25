import React from 'react'

function Shop(props) {
  console.log(props.products);
  return (
    <>
      <section className="products">
        <div className="title">
            <div className="card ind-name border">
                <h2>Unique and Artistic</h2>
            </div>
        </div>

      </section>
      </>
  )
}

export default Shop;