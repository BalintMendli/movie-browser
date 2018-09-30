import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
} from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {
    return (
      <div>
        <header>
          <Router>
            <Navbar color="transparent" dark expand="md" fixed="top" scrolling>
              <NavbarBrand href="/">
                <strong>Navbar</strong>
              </NavbarBrand>
              {!this.state.isWideEnough && (
                <NavbarToggler onClick={this.onClick} />
              )}
              <Collapse isOpen={this.state.collapse} navbar>
                <NavbarNav left>
                  <NavItem active>
                    <NavLink to="#">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="#">Link</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="#">Profile</NavLink>
                  </NavItem>
                </NavbarNav>
              </Collapse>
            </Navbar>
          </Router>
        </header>
      </div>
    );
  }
}

export default Header;
