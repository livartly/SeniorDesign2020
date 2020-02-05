import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <p><Link to="/" className="navhome">HOME</Link>
          <Link to="/resources" className="navvideos">RESOURCES</Link>
          <Link to="about" className="navsfx">ABOUT</Link>
          <Link to="/" href="" className="navcontact">CONTACT</Link>
        </p>
      </nav>
    );
  }
}

export default Navbar;
