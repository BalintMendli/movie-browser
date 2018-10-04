import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  Fa,
} from 'mdbreact';
import './Header.css';
import { Fade } from 'react-reveal';
import BrandImg from '../media/brand.png';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState(prevState => ({
      collapse: !prevState.collapse,
    }));
  }

  render() {
    return (
      <div>
        <header>
          <Navbar
            color="unique-color-dark"
            dark
            expand="md"
            fixed="top"
            scrolling
            transparent
            className={this.state.collapse ? 'navbar-opened' : ''}
          >
            <Fade left>
              <NavbarBrand href="/">
                <img src={BrandImg} height="40" alt="icon" />
              </NavbarBrand>
            </Fade>
            <Fade right>
              <NavbarToggler onClick={this.onClick} />
            </Fade>
            <Collapse isOpen={this.state.collapse} navbar>
              <Fade>
                <NavbarNav left>
                  <NavItem active>
                    <NavLink to="/">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/movies/">Movies</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/tv-shows/">TV Shows</NavLink>
                  </NavItem>
                </NavbarNav>
              </Fade>
              <NavbarNav right>
                <Fade>
                  <NavItem>
                    <NavLink to="/profile/">
                      <span className="d-md-none">Profile</span>
                      <Fa
                        icon="user-circle"
                        size="2x"
                        className="d-none d-md-inline"
                      />
                    </NavLink>
                  </NavItem>
                </Fade>
              </NavbarNav>
            </Collapse>
          </Navbar>
        </header>
      </div>
    );
  }
}

export default Header;
