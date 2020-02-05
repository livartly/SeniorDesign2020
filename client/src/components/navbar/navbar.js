import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <p><a href="http://livartly.com/wolframbeta/home.html" className="navhome"> HOME</a>
          <a href="http://livartly.com/wolframbeta/resources.html" className="navvideos">RESOURCES</a>
          <a href="http://livartly.com/wolframbeta/about.html" className="navsfx">ABOUT</a>
          <a href="" className="navcontact">CONTACT </a>
        </p>
      </nav>
    );
  }
}

export default Navbar;
