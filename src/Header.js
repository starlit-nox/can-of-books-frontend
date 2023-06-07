import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

// The Header component represents the navigation bar at the top of the application.
const Header = () => {
  // Destructure the necessary functions and properties from the useAuth0 hook.
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  // Render the navigation bar using the React Bootstrap components.
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>My Favorite Books</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {/* Conditionally render the Login or Logout button based on the authentication status. */}
          <Nav>
            {isAuthenticated === false ? (
              // Render the Login button if the user is not authenticated.
              <Button variant="light" onClick={() => loginWithRedirect()}>Login</Button>
            ) : (
              // Render the Logout button if the user is authenticated.
              <Button variant="light" onClick={() => logout()}>Logout</Button>
            )}
          </Nav>
          {/* Render the Home and About links using the React Router's Link component. */}
          <Nav.Item>
            <Link to="/" className="nav-link">Home</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/about" className="nav-link">About</Link>
          </Nav.Item>
          {/* Render the Profile link only if the user is authenticated. */}
          {isAuthenticated && (
            <Nav.Item>
              <Link to="/profile" className="nav-link">Profile</Link>
            </Nav.Item>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
