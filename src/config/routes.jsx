import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from '../pages/Home'

const routes = (props) => {
  return (
    <Switch>
      <Route exact path='/' render={() => <Redirect to='/plumandpear' />} />
      <Route exact path='/plumandpear' component={Home} />
    </Switch>
  )
}

export default routes;