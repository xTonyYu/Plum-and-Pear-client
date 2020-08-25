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
    admin: false,
  }

  componentDidMount() {
    if (localStorage.getItem('token') === 'undefined') {
      this.setState({currentUser: '', admin: false})
      return
    }
    let token = localStorage.getItem('token')
    let admin = localStorage.getItem('admin')
    if (token) {
      setAuthHeader(token)
      const decoded = jwt_decode(token)
      this.setState({
        currentUser: decoded.id, 
        admin: admin, 
      })
    } else {
      this.setState({admin: false})
    }
    console.log("admin in Comp Did Mount...", admin)
  }

  setCurrentUser= (token, admin) => {
    localStorage.setItem('token', token)
    localStorage.setItem('admin', admin)
    setAuthHeader(token)
    const decoded = jwt_decode(token)
    this.setState({
      currentUser: decoded.id, 
      admin: admin,
    })
  }
  
  logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('admin')
    setAuthHeader()
    this.setState({currentUser: '', admin: false})
    this.props.history.push('/')
  }

  render() {
    return (
      <React.Fragment>
        <Navibar currentUser={this.state.currentUser} admin={this.state.admin} logout={this.logout} />
        <main>
          <Routes currentUser={this.currentUser} setCurrentUser={this.setCurrentUser} admin={this.state.admin} />
        </main>
      </React.Fragment>    
    );
  }
}

export default withRouter(App);
