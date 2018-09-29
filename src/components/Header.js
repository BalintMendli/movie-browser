import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse,
  FormInline,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'mdbreact';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  toggleCollapse() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    return (
      <Navbar color="elegant-color-dark" dark expand="md">
        <NavbarBrand>
          <strong className="white-text">Navbar</strong>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleCollapse} />
        <Collapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <NavbarNav left>
            <NavItem active>
              <NavLink to="#!">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="#!">Features</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="#!">Pricing</NavLink>
            </NavItem>
            <NavItem>
              <Dropdown>
                <DropdownToggle nav caret>
                  <div className="d-inline">Dropdown</div>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="#!">Action</DropdownItem>
                  <DropdownItem href="#!">Another Action</DropdownItem>
                  <DropdownItem href="#!">Something else here</DropdownItem>
                  <DropdownItem href="#!">Something else here</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
          </NavbarNav>
          <NavbarNav right>
            <NavItem>
              <FormInline waves>
                <div className="md-form my-0">
                  <input
                    className="form-control mr-sm-2"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </div>
              </FormInline>
            </NavItem>
          </NavbarNav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Header;
