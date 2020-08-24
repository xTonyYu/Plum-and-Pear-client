import React from 'react';
// import { Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import './Navibar.css';

const Navibar = (props) => {
  return(
    <nav>
      <div className="container">
        <NavLink className="logo" exact to='/' >
          <div>Logo</div>
        </NavLink>
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink className="nav-link" exact to='/'>Shop</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to='/'>Account</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to='/admin'>Dashboard</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to='/admin/addprod'>Add Product</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to='/'>Logout</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navibar;