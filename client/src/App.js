import React, { Component } from 'react';

// Components
import Navbar from './components/navbar/navbar';
import Home from './components/home/home.js';
import About from './components/about/about.js';
import Resources from './components/resources/resources.js';
import Calculator from './components/calculator.js';
import Calculator2 from './components/calculator2.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Home />
        <Resources />
        <About />
        <Calculator />
        <Calculator2 />
      </div>
    );
  }
}

export default App;
