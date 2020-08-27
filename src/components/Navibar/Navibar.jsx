import React from 'react';
// import { Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import './Navibar.css';

const Navibar = ({currentUser, admin, logout}) => {
  
  return(
    <nav>
      <div className="container">
        <NavLink className="logo" exact to='/' >
          <div ><img src="/images/Logo.svg" alt="logo" id="logo" /></div>
        </NavLink>

        {currentUser && (
        <NavLink className="cart" exact to='/cart' >
          <div ><img src="/icons/cart.png" alt="logcarto" id="cart" /></div>
        </NavLink>
        )}
        
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink className="nav-link" exact to='/shop'>Shop</NavLink>
          </li>
        {(admin && admin !== 'false') && (
          <>
          <li className="nav-item">
            <NavLink className="nav-link" exact to='/admin'>{admin}Dashboard</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to='/admin/addprod'>Add</NavLink>
          </li>
          </>
        )}
        {currentUser && (
          <>
          <li className="nav-item">
            <NavLink className="nav-link" exact to='/profile'>Profile</NavLink>
          </li>
          <li className="nav-item">
            <span onClick={logout} className="nav-link" >Logout</span>
          </li>
          </>
        )}  
        {!currentUser && (
          <>
          <li className="nav-item">
            <NavLink className="nav-link" exact to='/login'>Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to='/signup'>Sign Up</NavLink>
          </li>
          </>
        )}
        </ul>
      </div>
    </nav>
  )
}

export default Navibar;