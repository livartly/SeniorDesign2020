import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  handleLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    return (
      <nav className="navbar">
        <p className="nav-container">
          <Link to="/" className="navhome">HOME</Link>
          <Link to="/resources" className="navvideos">RESOURCES</Link>
          <Link to="about" className="navsfx">ABOUT</Link>
          <Link to="/" className="navcontact">CONTACT</Link>
          <Link to="#" onClick={this.handleLogout.bind(this)}>LOGOUT</Link>
        </p>
      </nav>
    );
  }
}

export default Navbar;
