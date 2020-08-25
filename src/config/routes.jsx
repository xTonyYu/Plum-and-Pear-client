import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../components/Auth/Login'
import Signup from '../components/Auth/Signup'
import AddProduct from '../containers/AddProduct'
import EditProduct from '../containers/EditProduct'
import Index from '../pages/Index'
import Dashboard from '../pages/Dashboard'

export default ({currentUser, setCurrentUser, admin}) => {
  return (
    <Switch>
      <Route exact path='/' render={() => <Redirect to='/plumandpear' />} />
      <Route exact path='/plumandpear' component={Home} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/login' render={() => <Login setCurrentUser={setCurrentUser}/>} />

      <Route exact path='/admin/addprod' component={AddProduct} />
      <Route exact path='/admin/editprod' component={EditProduct} />
      <Route exact path='/admin/index' component={Index} />
      <Route exact path='/admin' component={Dashboard} />
      
      {/* <Route path='/admin/addprod' render={() => {
        {console.log(currentUser)}
        currentUser 
        ? <AddProduct />
        : <Redirect to='/login' />}
      }/> */}
      
        
      {/* <Route exact path='/admin/editprod' render={() => {
        admin ? <EditProduct /> : <Redirect to='/login' />
      }} />
      <Route exact path='/admin/index' render={() => {
        admin ? <Index /> : <Redirect to='/login' />
      }} />
      <Route exact path='/admin' render={() => {
        admin ? <Dashboard /> : <Redirect to='/login' />
      }} /> */}

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

// export default routes;