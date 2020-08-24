import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import Home from '../pages/Home'
import AddProduct from '../containers/AddProduct'
import Index from '../pages/Index'
import Dashboard from '../pages/Dashboard'

const routes = (props) => {
  return (
    <Switch>
      <Route exact path='/' render={() => <Redirect to='/plumandpear' />} />
      <Route exact path='/plumandpear' component={Home} />
      <Route exact path='/admin/addprod' component={AddProduct} />
      <Route exact path='/admin/index' component={Index} />
      <Route exact path='/admin' component={Dashboard} />
      {/* <Route path='/plumandpear/products' component={Products} /> */}
      {/* 404 Route */}
      <Route path='*' render={() => (
                <div>
                  <h2>404 ERR </h2>
                  <p>GO BACK
                  <Link to='/plumandpear'>Go back to home</Link>
                  </p>
                </div>)} />
    </Switch>
  )
}

export default routes;