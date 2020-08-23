import React from 'react';
// import logo from './logo.svg';
import Routes from './config/routes';
import Navibar from './components/Navibar/Navibar';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navibar />
        <main className="">
          <Routes />
        </main>
      </React.Fragment>    
    );
  }
}

export default App;
