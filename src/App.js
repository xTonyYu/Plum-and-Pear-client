import React from 'react';
import jwt_decode from 'jwt-decode';
import setAuthHeader from './util/setAuthHeader'
// import logo from './logo.svg';
import Routes from './config/routes';
import Navibar from './components/Navibar/Navibar';
import './App.css';

class App extends React.Component {
  state = {
    currentUser: '',
  }

  setCurrentUser= (token) => {
    localStorage.setItem('token', token)
    setAuthHeader(token)
    const decoded = jwt_decode(token)
    this.setState({currentUser: decoded.id})
  }

  render() {
    return (
      <React.Fragment>
        <Navibar />
        <main>
          <Routes currentUser={this.currentUser} setCurrentUser={this.setCurrentUser} />
        </main>
      </React.Fragment>    
    );
  }
}

export default App;
