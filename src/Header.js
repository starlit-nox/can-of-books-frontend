import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem><Link color="white" to="/home" className="nav-link">Home</Link></NavItem>
        {/* PLACEHOLDER: render a navigation link to the about page */}
        <NavItem><Link color="white" to="/about" className="nav-link">About</Link></NavItem>
      </Navbar>
    )
  }
}

export default Header;
