import React from 'react';
import { connect } from 'react-redux'
import jwt_decode from 'jwt-decode';
import setAuthHeader from './util/setAuthHeader'
// import logo from './logo.svg';
import Routes from './config/routes';
import Navibar from './components/Navibar/Navibar';
import Footer from './components/Footer/Footer';
import { withRouter } from 'react-router-dom'
import { updateNumItemsInCart } from './actions/cartActions'

import './App.css';


class App extends React.Component {
  state = {
    currentUser: '',
    userInfo: {},
    admin: 'false',
  }

  componentDidMount() {
    console.log("component did mount")
    if (localStorage.getItem('token') === 'undefined') {
      this.setState({currentUser: '', admin: false})
      return
    }
    let token = localStorage.getItem('token')
    let admin = localStorage.getItem('admin')
    let foundUser = this.updateStateWithLatestUserInfo()
    if (token) {
      setAuthHeader(token)
      const decoded = jwt_decode(token)
      this.setState({
        currentUser: decoded.id, 
        admin: admin, 
        userInfo: foundUser,
      })
    } else {
      this.setState({admin: false})
    }
  }

  setCurrentUser= (token, admin, foundUser) => {
    localStorage.setItem('token', token)
    localStorage.setItem('admin', admin)
    localStorage.setItem('foundUser', JSON.stringify(foundUser))
    this.updateStateWithLatestUserInfo()
    setAuthHeader(token)
    const decoded = jwt_decode(token)
    this.setState({
      currentUser: decoded.id, 
      admin: admin,
      userInfo: foundUser,
    })
  }

  updateStateWithLatestUserInfo= () => {
    let foundUserJson = localStorage.getItem('foundUser')
    let foundUser = JSON.parse(foundUserJson)
    if (foundUser) {
      const numItemsInCartNow = foundUser.cart.reduce((acc, cur) => acc += cur.totQty, 0)
      this.props.updateNumItemsInCart(numItemsInCartNow || 0)
    }
    return foundUser
  }
  
  logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('admin')
    localStorage.removeItem('foundUser')
    setAuthHeader()
    this.setState({currentUser: '', userInfo: {}, admin: false})
    this.props.history.push('/')
  }

  render() {
    return (
      <React.Fragment>
        <Navibar currentUser={this.state.currentUser} admin={this.state.admin} logout={this.logout} userInfo={this.state.userInfo} />
        <main>
          <Routes currentUser={this.state.currentUser} userInfo={this.state.userInfo} setCurrentUser={this.setCurrentUser} admin={this.state.admin} />
        </main>
        <Footer />
      </React.Fragment>    
    );
  }
}

const mapStateToProps = (state) => ({
    numItems: state.cart.numItems,
    items: state.cart.items,
    stateCart: state.cart,
  })
export default withRouter(connect(mapStateToProps, { updateNumItemsInCart }) (App));
