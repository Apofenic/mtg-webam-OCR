import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Uploader from './Uploader'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Uploader/>
      </div>
    );
  }
}

export default App;
