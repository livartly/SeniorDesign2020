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
        <p><Link to="/" className="navhome">HOME</Link>
          <Link to="/resources" className="navvideos">RESOURCES</Link>
          <Link to="about" className="navsfx">ABOUT</Link>
          <Link to="/" href="" className="navcontact">CONTACT</Link>
          <a onClick={this.handleLogout.bind(this)}>
            Logout
          </a>
        </p>
      </nav>
    );
  }
}

export default Navbar;
