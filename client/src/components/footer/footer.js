import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Footer } from 'react-bootstrap';

class FooterPage extends Component {
  handleLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    if (!this.props.user || !this.props.user.id) return (
      <div>

      </div>
    );

    if (this.props.user || this.props.user.id) return (

      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/resources">Resources</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/feedback">Contact</Nav.Link>
          </Nav>
          <Navbar.Brand><b>© 2020, Wolfram Beta</b></Navbar.Brand>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default FooterPage;
