import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

class TopNav extends Component {
  handleLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    if (!this.props.user || !this.props.user.id) return (
      <img
        className="avatar"
        src="/images/longLogo.jpg"
        alt="Wolf Ram Beta"
      />
    );
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
          <img
            src="/images/logo.jpg"
            alt="Wolfram Beta Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="top-nav-links" />
        <Navbar.Collapse id="top-nav-links" className="justify-content-end">
          <Nav>
            <Nav.Link href="/resources">Resource</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/feedback">Contact</Nav.Link>
            <Nav.Link href="#" onClick={this.handleLogout.bind(this)}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar >
    );
  }
}

export default TopNav;
