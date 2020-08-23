import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from '../pages/Home'
import Products from '../pages/Products'
import Dashboard from '../pages/Dashboard'

const routes = (props) => {
  return (
    <Switch>
      <Route exact path='/' render={() => <Redirect to='/plumandpear' />} />
      <Route exact path='/plumandpear' component={Home} />
      <Route path='/admin' component={Dashboard} />
      {/* <Route path='/plumandpear/products' component={Products} /> */}
    </Switch>
  )
}

export default routes;