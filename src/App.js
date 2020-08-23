import React from 'react';
// import logo from './logo.svg';
import Routes from './config/routes';
import Navbar from './components/Navbar/Navbar';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="">
          <Routes />
        </main>
      </React.Fragment>    
    );
  }
}

export default App;
