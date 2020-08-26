import React from 'react';
import jwt_decode from 'jwt-decode';
import setAuthHeader from './util/setAuthHeader'
// import logo from './logo.svg';
import Routes from './config/routes';
import Navibar from './components/Navibar/Navibar';
import { withRouter } from 'react-router-dom'
import './App.css';


class App extends React.Component {
  state = {
    currentUser: '',
    userInfo: {},
    admin: false,
  }

  componentDidMount() {
    if (localStorage.getItem('token') === 'undefined') {
      this.setState({currentUser: '', admin: false})
      return
    }
    let token = localStorage.getItem('token')
    let admin = localStorage.getItem('admin')
    let foundUser = localStorage.getItem('foundUser')
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
    console.log("admin in Comp Did Mount...", admin)
  }

  setCurrentUser= (token, admin, foundUser) => {
    localStorage.setItem('token', token)
    localStorage.setItem('admin', admin)
    localStorage.setItem('foundUser', foundUser)
    setAuthHeader(token)
    const decoded = jwt_decode(token)
    this.setState({
      currentUser: decoded.id, 
      admin: admin,
      userInfo: foundUser,
    })
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
        <Navibar currentUser={this.state.currentUser} admin={this.state.admin} logout={this.logout} />
        <main>
          <Routes currentUser={this.state.currentUser} userInfo={this.state.userInfo} setCurrentUser={this.setCurrentUser} admin={this.state.admin} />
        </main>
      </React.Fragment>    
    );
  }
}

export default withRouter(App);
