import React from 'react';
// import { Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import './Navibar.css';

const Navibar = ({currentUser, userInfo, admin, logout}) => {
  
  return(
    <nav>
      <div className="container">
        <div className="logo-cart">
          <NavLink className="logo" exact to='/' >
            <img src="/images/Logo.svg" alt="logo" id="logo" />
          </NavLink>

          {currentUser && (
          <>
          <NavLink className="cart" exact to='/cart' >
            <div className="item-count"><img src="/icons/cart.png" alt="logcarto" id="cart" /></div>
          </NavLink>
          <div className="first-name">
            <p>Hi {userInfo.firstName}</p>
          </div>
          </>
          )}

        </div>
        
        <ul className="nav-list">
          
          <li className="nav-item">
            <NavLink className="nav-link" exact to='/shop'>Shop</NavLink>
          </li>
        {(admin === 'true') && (
          <>
          <li className="nav-item">
            <NavLink className="nav-link" exact to='/admin'>Dashboard</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to='/admin/addprod'>Add</NavLink>
          </li>
          </>
        )}
        {currentUser && (
          <>
          {/* <li className="nav-item">
            <NavLink className="nav-link" exact to='/profile'>Profile</NavLink>
          </li> */}
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
            <NavLink className="nav-link" exact to='/signup'>SignUp</NavLink>
          </li>
          </>
        )}
        </ul>
      </div>
    </nav>
  )
}

export default Navibar;