import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Shop from '../pages/Shop'
import Login from '../components/Auth/Login'
import Signup from '../components/Auth/Signup'
import AddProduct from '../containers/AddProduct'
import EditProduct from '../containers/EditProduct'
import Index from '../pages/Index' 
import Dashboard from '../pages/Dashboard'

export default ({currentUser, userInfo, setCurrentUser, admin}) => {
  return (
    <Switch>
      <Route exact path='/' render={() => <Redirect to='/plumandpear' />} />
      <Route exact path='/plumandpear' component={Home} />
      <Route exact path='/cart' render={() => 
        currentUser
        ? <Cart admin={admin} userInfo={userInfo} currentUser={currentUser} /> 
        : <Redirect to='/login' />
      } />
      <Route exact path='/shop' render={() => <Shop admin={admin} userInfo={userInfo} currentUser={currentUser} /> } />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/login' render={() => <Login setCurrentUser={setCurrentUser}/>} />
      <Route path='/admin/addprod' render={() => 
        admin === 'true' ? <AddProduct /> : <Redirect to='/login' />
      }/>

      <Route exact path='/admin/editprod' component={EditProduct} />
      {/* <Route exact path='/admin/editprod' render={() => 
        admin === 'true' ? <EditProduct /> : <Redirect to='/login' />
      } /> */}
      <Route exact path='/admin/index' component={Index} />
      {/* <Route exact path='/admin/index' render={() => 
        admin === 'true' ? <Index /> : <Redirect to='/login' />
      } /> */}
      <Route exact path='/admin' render={() => 
        admin === 'true' ? <Dashboard admin={admin} currentUser={currentUser} /> : <Redirect to='/login' />
      } />

      {/* 404 Route */}
      <Route path='*' render={() => (
                <div className="container">
                  <h2>404 ERR </h2>
                  <p>GO BACK
                  <Link to='/plumandpear'>Go back to home</Link>
                  </p>
                </div>)} />
    </Switch>
  )
}

// export default routes;